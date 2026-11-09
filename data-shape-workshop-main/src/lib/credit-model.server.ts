import model from "./model/credit-model.json";
import type { Applicant, Factor, Prediction } from "./applicant-schema";

/**
 * Runs the exported Logistic Regression exactly like the notebook pipeline:
 * label-encode Education_Level, one-hot (drop first) the categoricals,
 * add DTI_Ratio_sq / Credit_Score_sq (dropping the raw columns), StandardScaler, sigmoid.
 */

const FRIENDLY: Record<string, string> = {
  Applicant_Income: "Applicant income",
  Coapplicant_Income: "Co-applicant income",
  Age: "Age",
  Dependents: "Dependents",
  Existing_Loans: "Existing loans",
  Savings: "Savings",
  Collateral_Value: "Collateral value",
  Loan_Amount: "Loan amount",
  Loan_Term: "Loan term",
  Education_Level: "Education",
  DTI_Ratio_sq: "Debt-to-income ratio",
  Credit_Score_sq: "Credit score",
};

const GROUPS: Record<string, string> = {
  Employment_Status: "Employment status",
  Marital_Status: "Marital status",
  Loan_Purpose: "Loan purpose",
  Property_Area: "Property area",
  Gender: "Gender",
  Employer_Category: "Employer category",
};

function buildFeatures(a: Applicant): Record<string, number> {
  const f: Record<string, number> = {
    Applicant_Income: a.applicantIncome,
    Coapplicant_Income: a.coapplicantIncome,
    Age: a.age,
    Dependents: a.dependents,
    Existing_Loans: a.existingLoans,
    Savings: a.savings,
    Collateral_Value: a.collateralValue,
    Loan_Amount: a.loanAmount,
    Loan_Term: a.loanTerm,
    // LabelEncoder: Graduate=0, Not Graduate=1
    Education_Level: a.educationLevel === "Not Graduate" ? 1 : 0,
    DTI_Ratio_sq: a.dtiRatio ** 2,
    Credit_Score_sq: a.creditScore ** 2,
  };
  const cats: Record<string, string> = {
    Employment_Status: a.employmentStatus,
    Marital_Status: a.maritalStatus,
    Loan_Purpose: a.loanPurpose,
    Property_Area: a.propertyArea,
    Gender: a.gender,
    Employer_Category: a.employerCategory,
  };
  for (const name of model.features) {
    const group = Object.keys(GROUPS).find((g) => name.startsWith(`${g}_`));
    if (group) f[name] = name === `${group}_${cats[group]}` ? 1 : 0;
  }
  return f;
}

export function predictApproval(a: Applicant): Prediction {
  const f = buildFeatures(a);
  let z = model.intercept;
  const grouped = new Map<string, number>();

  model.features.forEach((name, i) => {
    const scaled = ((f[name] ?? 0) - (model.mean[i] ?? 0)) / (model.scale[i] ?? 1);
    const contribution = (model.coef[i] ?? 0) * scaled;
    z += contribution;
    const group = Object.keys(GROUPS).find((g) => name.startsWith(`${g}_`));
    const label: string = (group ? GROUPS[group] : FRIENDLY[name]) ?? name;
    grouped.set(label, (grouped.get(label) ?? 0) + contribution);
  });

  const probability = 1 / (1 + Math.exp(-z));
  const factors: Factor[] = [...grouped.entries()]
    .map(([label, impact]) => ({ label, impact: Number(impact.toFixed(4)) }))
    .sort((x, y) => Math.abs(y.impact) - Math.abs(x.impact))
    .slice(0, 6);

  return { probability, approved: probability >= 0.5, factors };
}
