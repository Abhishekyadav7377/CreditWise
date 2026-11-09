"""
CreditWise - Loan Approval Prediction Model Trainer
=====================================================
Trains a Logistic Regression model on loan_approval_data.csv and exports
the learned weights to src/lib/model/credit-model.json for use by the
CreditWise web application.

Usage:
    python scripts/train_model.py

Requirements:
    pip install pandas numpy scikit-learn

Output:
    src/lib/model/credit-model.json  — model weights, scaler params, feature list
"""

import json
import os
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder, StandardScaler

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "loan_approval_data.csv"
MODEL_OUT = ROOT / "src" / "lib" / "model" / "credit-model.json"

# ── 1. Load Data ─────────────────────────────────────────────────────────────
print(f"Loading data from: {DATA_PATH}")
if not DATA_PATH.exists():
    sys.exit(f"ERROR: {DATA_PATH} not found. Place loan_approval_data.csv in the project root.")

df = pd.read_csv(DATA_PATH)
print(f"  Shape: {df.shape}")
print(f"  Columns: {list(df.columns)}")

# ── 2. Handle Missing Values ─────────────────────────────────────────────────
print("\nHandling missing values...")
numerical_cols = df.select_dtypes(include=["number"]).columns.tolist()
categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()

# Fill numerical with median (more robust than mean for skewed data)
for col in numerical_cols:
    if df[col].isnull().any():
        median_val = df[col].median()
        df[col].fillna(median_val, inplace=True)
        print(f"  Filled {col} with median={median_val:.2f}")

# Fill categorical with mode
for col in categorical_cols:
    if df[col].isnull().any():
        mode_val = df[col].mode()[0]
        df[col].fillna(mode_val, inplace=True)
        print(f"  Filled {col} with mode='{mode_val}'")

# ── 3. Remove ID column if present ───────────────────────────────────────────
if "Applicant_ID" in df.columns:
    df = df.drop("Applicant_ID", axis=1)

# ── 4. Encode Target ─────────────────────────────────────────────────────────
print("\nEncoding target variable...")
target_col = "Loan_Approved"
le_target = LabelEncoder()
df[target_col] = le_target.fit_transform(df[target_col])
print(f"  Classes: {dict(zip(le_target.classes_, le_target.transform(le_target.classes_)))}")
print(f"  Approval rate: {df[target_col].mean():.1%}")

# ── 5. Encode Education_Level with LabelEncoder (Graduate=0, Not Graduate=1) ─
print("\nLabel-encoding Education_Level...")
le_edu = LabelEncoder()
df["Education_Level"] = le_edu.fit_transform(df["Education_Level"])

# ── 6. One-Hot Encode Remaining Categoricals (drop_first to avoid multicollinearity) ──
print("One-hot encoding categorical columns (drop_first=True)...")
one_hot_cols = [c for c in categorical_cols if c not in ["Loan_Approved", "Education_Level"]]
df = pd.get_dummies(df, columns=one_hot_cols, drop_first=True)
print(f"  Feature count after encoding: {df.shape[1] - 1}")

# ── 7. Feature Engineering ───────────────────────────────────────────────────
print("\nEngineering features...")
if "DTI_Ratio" in df.columns:
    df["DTI_Ratio_sq"] = df["DTI_Ratio"] ** 2
    df = df.drop("DTI_Ratio", axis=1)
    print("  Added DTI_Ratio_sq, dropped DTI_Ratio")

if "Credit_Score" in df.columns:
    df["Credit_Score_sq"] = df["Credit_Score"] ** 2
    df = df.drop("Credit_Score", axis=1)
    print("  Added Credit_Score_sq, dropped Credit_Score")

# ── 8. Train/Test Split ───────────────────────────────────────────────────────
print("\nSplitting data (80/20, random_state=42)...")
X = df.drop(target_col, axis=1)
y = df[target_col]
feature_names = list(X.columns)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"  Train: {len(X_train)} | Test: {len(X_test)}")

# ── 9. Scale Features ────────────────────────────────────────────────────────
print("Scaling features (StandardScaler)...")
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

# ── 10. Train Baseline Models ─────────────────────────────────────────────────
print("\n=== BASELINE MODELS (no feature engineering) ===")
print("-" * 50)

models_baseline = {
    "Logistic Regression": LogisticRegression(max_iter=1000, C=1.0, random_state=42),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "Naive Bayes": GaussianNB(),
}

for name, model in models_baseline.items():
    model.fit(X_train_s, y_train)
    y_pred = model.predict(X_test_s)
    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    print(f"  {name:25s}  Accuracy={acc:.3f}  F1={f1:.3f}")

# ── 11. Train Final Logistic Regression Model ────────────────────────────────
print("\n=== FINAL MODEL: Logistic Regression (feature-engineered) ===")
print("-" * 50)

lr = LogisticRegression(max_iter=1000, C=1.0, random_state=42)
lr.fit(X_train_s, y_train)
y_pred_lr = lr.predict(X_test_s)
print(classification_report(y_test, y_pred_lr, target_names=["Declined", "Approved"]))

# Top features by absolute coefficient
print("Top 10 most influential features:")
coef_series = pd.Series(lr.coef_[0], index=feature_names).sort_values(key=abs, ascending=False)
for feat, coef in coef_series.head(10).items():
    print(f"  {feat:35s}  {coef:+.4f}")

# ── 12. Export Model JSON ─────────────────────────────────────────────────────
print(f"\nExporting model to: {MODEL_OUT}")
MODEL_OUT.parent.mkdir(parents=True, exist_ok=True)

model_data = {
    "features": feature_names,
    "mean": [round(float(v), 6) for v in scaler.mean_],
    "scale": [round(float(v), 6) for v in scaler.scale_],
    "coef": [round(float(v), 6) for v in lr.coef_[0]],
    "intercept": round(float(lr.intercept_[0]), 6),
}

with open(MODEL_OUT, "w") as f:
    json.dump(model_data, f, indent=1)

print(f"  Saved {len(feature_names)} features.")
print("\nDone! credit-model.json has been updated.")
