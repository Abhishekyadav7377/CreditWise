import { z } from "zod";

// Category values match the columns in the CreditWise notebook (loan_approval_data.csv).
export const EMPLOYMENT_STATUS = ["Salaried", "Self-employed", "Contract", "Unemployed"] as const;
export const EMPLOYER_CATEGORY = [
  "Private",
  "MNC",
  "Government",
  "Business",
  "Unemployed",
] as const;
export const MARITAL_STATUS = ["Married", "Single"] as const;
export const LOAN_PURPOSE = ["Home", "Car", "Education", "Business", "Personal"] as const;
export const PROPERTY_AREA = ["Urban", "Semiurban", "Rural"] as const;
export const EDUCATION_LEVEL = ["Graduate", "Not Graduate"] as const;
export const GENDER = ["Male", "Female"] as const;
export const LOAN_TERMS = [12, 24, 36, 48, 60, 72, 84] as const;

export const applicantSchema = z.object({
  applicantIncome: z.number().min(0).max(1_000_000),
  coapplicantIncome: z.number().min(0).max(1_000_000),
  age: z.number().min(18).max(100),
  dependents: z.number().int().min(0).max(10),
  creditScore: z.number().min(300).max(900),
  existingLoans: z.number().int().min(0).max(20),
  dtiRatio: z.number().min(0).max(1),
  savings: z.number().min(0).max(10_000_000),
  collateralValue: z.number().min(0).max(10_000_000),
  loanAmount: z.number().min(0).max(10_000_000),
  loanTerm: z.number().min(1).max(480),
  employmentStatus: z.enum(EMPLOYMENT_STATUS),
  employerCategory: z.enum(EMPLOYER_CATEGORY),
  maritalStatus: z.enum(MARITAL_STATUS),
  loanPurpose: z.enum(LOAN_PURPOSE),
  propertyArea: z.enum(PROPERTY_AREA),
  educationLevel: z.enum(EDUCATION_LEVEL),
  gender: z.enum(GENDER),
});

export type Applicant = z.infer<typeof applicantSchema>;

export type Factor = { label: string; impact: number };

export type Prediction = {
  probability: number;
  approved: boolean;
  factors: Factor[];
};

export const defaultApplicant: Applicant = {
  applicantIncome: 12000,
  coapplicantIncome: 4000,
  age: 34,
  dependents: 1,
  creditScore: 705,
  existingLoans: 1,
  dtiRatio: 0.28,
  savings: 9000,
  collateralValue: 25000,
  loanAmount: 18000,
  loanTerm: 36,
  employmentStatus: "Salaried",
  employerCategory: "Private",
  maritalStatus: "Married",
  loanPurpose: "Home",
  propertyArea: "Urban",
  educationLevel: "Graduate",
  gender: "Male",
};
