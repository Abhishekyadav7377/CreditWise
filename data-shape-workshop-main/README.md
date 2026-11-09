# CreditWise — Instant Loan Approval Predictor

> A full-stack AI-powered web application that predicts loan approval probability in real time using a Logistic Regression model trained on 1,000 loan applications.

![CreditWise Screenshot](https://via.placeholder.com/1200x600/0f1a12/c8a96e?text=CreditWise+%E2%80%94+Instant+Loan+Approval+Predictor)

---

## 🎯 What It Does

CreditWise lets you build an applicant profile by adjusting sliders and dropdowns, and instantly see:

- **Approval probability** — a live gauge from 0–100%
- **Verdict** — Likely Approved ✅ or Likely Declined ❌
- **What moved the needle** — the top 6 factors helping or hurting the application, ranked by impact

---

## 🧠 The Machine Learning Model

### Dataset: `loan_approval_data.csv`

| Column               | Type        | Description                                        |
| -------------------- | ----------- | -------------------------------------------------- |
| `Applicant_Income`   | numeric     | Monthly income of primary applicant (₹)            |
| `Coapplicant_Income` | numeric     | Monthly income of co-applicant (₹)                 |
| `Age`                | numeric     | Applicant age (years)                              |
| `Dependents`         | numeric     | Number of financial dependents                     |
| `Credit_Score`       | numeric     | CIBIL credit score (550–800)                       |
| `Existing_Loans`     | numeric     | Count of active loans                              |
| `DTI_Ratio`          | numeric     | Debt-to-income ratio (0.1–0.6)                     |
| `Savings`            | numeric     | Total savings amount (₹)                           |
| `Collateral_Value`   | numeric     | Value of collateral offered (₹)                    |
| `Loan_Amount`        | numeric     | Requested loan amount (₹)                          |
| `Loan_Term`          | numeric     | Loan duration in months                            |
| `Employment_Status`  | categorical | Salaried / Self-employed / Contract / Unemployed   |
| `Employer_Category`  | categorical | Private / MNC / Government / Business / Unemployed |
| `Marital_Status`     | categorical | Married / Single                                   |
| `Loan_Purpose`       | categorical | Home / Car / Education / Business / Personal       |
| `Property_Area`      | categorical | Urban / Semiurban / Rural                          |
| `Education_Level`    | categorical | Graduate / Not Graduate                            |
| `Gender`             | categorical | Male / Female                                      |
| `Loan_Approved`      | target      | Yes / No                                           |

**Dataset size:** 1,000 applicants · 50 missing values imputed via median/mode

### Preprocessing Pipeline

```
Raw CSV
  → Impute missing (numerical → median, categorical → mode)
  → Drop Applicant_ID
  → Label-encode Education_Level (Graduate=0, Not Graduate=1)
  → One-hot encode 6 categorical columns (drop_first=True)
  → Feature engineering:
      DTI_Ratio² → captures nonlinear penalty for high debt burden
      Credit_Score² → captures accelerating reward for excellent scores
  → StandardScaler (fit on train, transform both)
  → LogisticRegression (C=1, L2, max_iter=1000)
```

### Model Comparison (200-row test set)

| Model                                | Accuracy | Precision | Recall    | F1       |
| ------------------------------------ | -------- | --------- | --------- | -------- |
| **Logistic Regression (engineered)** | **88%**  | **78.5%** | **83.6%** | **0.81** |
| Logistic Regression (baseline)       | 86.5%    | 78.3%     | 77.0%     | 0.78     |
| KNN                                  | 78.5%    | 67.3%     | 57.4%     | 0.62     |
| Naive Bayes                          | 86.0%    | 81.1%     | 70.5%     | 0.75     |

### Key Insights

| Signal                 | Correlation                            |
| ---------------------- | -------------------------------------- |
| Credit Score (squared) | **+0.45** strongest positive predictor |
| DTI Ratio (squared)    | **−0.44** strongest negative predictor |
| MNC Employer           | +0.35 premium                          |
| Unemployed status      | −0.40 penalty                          |

---

## 🏗️ Project Architecture

```
creditwise/
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # HTML shell, error boundary, React Query provider
│   │   └── index.tsx           # Main page — wires form, result, and model lab
│   ├── components/
│   │   └── credit/
│   │       ├── ApplicantForm.tsx   # 4-section form (credit, income, loan, personal)
│   │       ├── ResultPanel.tsx     # Gauge chart + factor impact bars
│   │       └── ModelLab.tsx        # Bar chart comparing 3 models × 4 metrics
│   └── lib/
│       ├── applicant-schema.ts     # Zod schema + TypeScript types
│       ├── credit-model.server.ts  # Inference engine (runs server-side)
│       ├── predict.functions.ts    # TanStack server function wrapper
│       ├── model-metrics.ts        # Hardcoded test-set metrics for ModelLab
│       ├── error-reporting.ts      # Error boundary reporting utility
│       ├── error-capture.ts        # Server-side error capture
│       ├── error-page.ts           # Fallback HTML error page
│       └── model/
│           └── credit-model.json   # Exported model (weights, scaler, features)
├── scripts/
│   └── train_model.py          # Retraining script — runs on loan_approval_data.csv
├── loan_approval_data.csv      # Training dataset (place here before retraining)
└── package.json
```

### How the Prediction Works

The inference runs entirely **server-side** via a TanStack Start server function:

1. Browser sends the `Applicant` object on every form change (debounced 250ms)
2. Server validates it with Zod, then calls `predictApproval()`
3. `predictApproval()` builds the same 27-feature vector the Python pipeline produced
4. Features are StandardScaled using the saved mean/scale, then dot-producted with saved coefficients
5. Sigmoid activation converts the logit to a probability
6. Top 6 contributing factors are extracted and returned with the probability

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and **pnpm** (or npm/bun)
- **Python 3.9+** with pandas, numpy, scikit-learn (only if retraining)

### Run the Web App

```sh
# Clone the repo
git clone <repository-url>
cd creditwise

# Install dependencies
pnpm install   # or: npm install

# Start dev server
pnpm dev       # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Retrain the Model

If you have an updated `loan_approval_data.csv`:

```sh
# Install Python dependencies
pip install pandas numpy scikit-learn

# Place your CSV in the project root, then:
python scripts/train_model.py
```

This overwrites `src/lib/model/credit-model.json` with fresh weights. Restart the dev server to use the new model.

---

## 🛠️ Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Framework      | [TanStack Start](https://tanstack.com/start) (React 19 + SSR) |
| Routing        | TanStack Router (file-based)                                  |
| Styling        | Tailwind CSS v4                                               |
| UI Components  | shadcn/ui + Radix UI                                          |
| Charts         | Recharts                                                      |
| Validation     | Zod                                                           |
| ML (training)  | scikit-learn (Python)                                         |
| ML (inference) | Pure TypeScript (no runtime dependency)                       |
| Build tool     | Vite 8                                                        |
| Testing        | Vitest + Testing Library                                      |

---

## 📊 Available Scripts

| Command                         | Description                       |
| ------------------------------- | --------------------------------- |
| `pnpm dev`                      | Start development server with HMR |
| `pnpm build`                    | Production build                  |
| `pnpm preview`                  | Preview production build locally  |
| `pnpm test`                     | Run test suite                    |
| `pnpm lint`                     | ESLint check                      |
| `pnpm format`                   | Prettier format                   |
| `python scripts/train_model.py` | Retrain model from CSV            |

---

## 🔄 Model Update Workflow

```
loan_approval_data.csv
        ↓
python scripts/train_model.py
        ↓
src/lib/model/credit-model.json  (updated weights)
        ↓
pnpm build  →  deploy
```

---

## ⚖️ Disclaimer

CreditWise is a **demonstration application** built for educational purposes. Predictions are statistical estimates based on historical patterns in the training data and are **not** actual lending decisions. Do not use this tool as the basis for real credit decisions.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
