import { z } from "zod";
//#region src/lib/applicant-schema.ts
var EMPLOYMENT_STATUS = [
	"Salaried",
	"Self-employed",
	"Contract",
	"Unemployed"
];
var EMPLOYER_CATEGORY = [
	"Private",
	"MNC",
	"Government",
	"Business",
	"Unemployed"
];
var MARITAL_STATUS = ["Married", "Single"];
var LOAN_PURPOSE = [
	"Home",
	"Car",
	"Education",
	"Business",
	"Personal"
];
var PROPERTY_AREA = [
	"Urban",
	"Semiurban",
	"Rural"
];
var EDUCATION_LEVEL = ["Graduate", "Not Graduate"];
var GENDER = ["Male", "Female"];
var LOAN_TERMS = [
	12,
	24,
	36,
	48,
	60,
	72,
	84
];
var applicantSchema = z.object({
	applicantIncome: z.number().min(0).max(1e6),
	coapplicantIncome: z.number().min(0).max(1e6),
	age: z.number().min(18).max(100),
	dependents: z.number().int().min(0).max(10),
	creditScore: z.number().min(300).max(900),
	existingLoans: z.number().int().min(0).max(20),
	dtiRatio: z.number().min(0).max(1),
	savings: z.number().min(0).max(1e7),
	collateralValue: z.number().min(0).max(1e7),
	loanAmount: z.number().min(0).max(1e7),
	loanTerm: z.number().min(1).max(480),
	employmentStatus: z.enum(EMPLOYMENT_STATUS),
	employerCategory: z.enum(EMPLOYER_CATEGORY),
	maritalStatus: z.enum(MARITAL_STATUS),
	loanPurpose: z.enum(LOAN_PURPOSE),
	propertyArea: z.enum(PROPERTY_AREA),
	educationLevel: z.enum(EDUCATION_LEVEL),
	gender: z.enum(GENDER)
});
var defaultApplicant = {
	applicantIncome: 12e3,
	coapplicantIncome: 4e3,
	age: 34,
	dependents: 1,
	creditScore: 705,
	existingLoans: 1,
	dtiRatio: .28,
	savings: 9e3,
	collateralValue: 25e3,
	loanAmount: 18e3,
	loanTerm: 36,
	employmentStatus: "Salaried",
	employerCategory: "Private",
	maritalStatus: "Married",
	loanPurpose: "Home",
	propertyArea: "Urban",
	educationLevel: "Graduate",
	gender: "Male"
};
//#endregion
export { LOAN_PURPOSE as a, PROPERTY_AREA as c, GENDER as i, applicantSchema as l, EMPLOYER_CATEGORY as n, LOAN_TERMS as o, EMPLOYMENT_STATUS as r, MARITAL_STATUS as s, EDUCATION_LEVEL as t, defaultApplicant as u };
