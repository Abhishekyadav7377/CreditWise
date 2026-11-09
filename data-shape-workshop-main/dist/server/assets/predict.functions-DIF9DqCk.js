import { p as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-klzoUz4R.js";
import { l as applicantSchema } from "./applicant-schema-BJ62E6Jy.js";
//#region node_modules/.pnpm/@tanstack+start-server-core_6d6effdb6849c4138fe521b37be145b9/node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var credit_model_default = {
	features: [
		"Applicant_Income",
		"Coapplicant_Income",
		"Age",
		"Dependents",
		"Existing_Loans",
		"Savings",
		"Collateral_Value",
		"Loan_Amount",
		"Loan_Term",
		"Education_Level",
		"Employment_Status_Salaried",
		"Employment_Status_Self-employed",
		"Employment_Status_Unemployed",
		"Marital_Status_Single",
		"Loan_Purpose_Car",
		"Loan_Purpose_Education",
		"Loan_Purpose_Home",
		"Loan_Purpose_Personal",
		"Property_Area_Semiurban",
		"Property_Area_Urban",
		"Gender_Male",
		"Employer_Category_Government",
		"Employer_Category_MNC",
		"Employer_Category_Private",
		"Employer_Category_Unemployed",
		"DTI_Ratio_sq",
		"Credit_Score_sq"
	],
	mean: [
		11040.445,
		5069.03,
		39.145,
		1.43,
		2.01625,
		9968.925,
		25318.03,
		21141.8025,
		47.85,
		.345,
		.455,
		.24625,
		.09375,
		.48875,
		.17875,
		.20375,
		.21875,
		.20625,
		.30125,
		.34375,
		.48875,
		.20375,
		.18,
		.19125,
		.2025,
		.133244,
		457241.44375
	],
	scale: [
		5263.78034,
		2879.135264,
		11.230827,
		1.035664,
		1.385094,
		5697.870596,
		14129.775866,
		11329.451341,
		24.149068,
		.475368,
		.497971,
		.430826,
		.291481,
		.499873,
		.383143,
		.402785,
		.413399,
		.404612,
		.458801,
		.474959,
		.499873,
		.402785,
		.384187,
		.393285,
		.401863,
		.099608,
		96898.064162
	],
	coef: [
		.903179,
		-.198508,
		-.118969,
		-.083766,
		-.062514,
		-.059072,
		.227099,
		-.502045,
		-.426092,
		-.146852,
		-.043159,
		-.085872,
		-.409192,
		.095762,
		.140833,
		.246877,
		.026199,
		.019242,
		.199067,
		.026485,
		.230173,
		.003166,
		.235079,
		.132953,
		.006791,
		-2.209624,
		3.726152
	],
	intercept: -1.800238
};
//#endregion
//#region src/lib/credit-model.server.ts
/**
* Runs the exported Logistic Regression exactly like the notebook pipeline:
* label-encode Education_Level, one-hot (drop first) the categoricals,
* add DTI_Ratio_sq / Credit_Score_sq (dropping the raw columns), StandardScaler, sigmoid.
*/
var FRIENDLY = {
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
	Credit_Score_sq: "Credit score"
};
var GROUPS = {
	Employment_Status: "Employment status",
	Marital_Status: "Marital status",
	Loan_Purpose: "Loan purpose",
	Property_Area: "Property area",
	Gender: "Gender",
	Employer_Category: "Employer category"
};
function buildFeatures(a) {
	const f = {
		Applicant_Income: a.applicantIncome,
		Coapplicant_Income: a.coapplicantIncome,
		Age: a.age,
		Dependents: a.dependents,
		Existing_Loans: a.existingLoans,
		Savings: a.savings,
		Collateral_Value: a.collateralValue,
		Loan_Amount: a.loanAmount,
		Loan_Term: a.loanTerm,
		Education_Level: a.educationLevel === "Not Graduate" ? 1 : 0,
		DTI_Ratio_sq: a.dtiRatio ** 2,
		Credit_Score_sq: a.creditScore ** 2
	};
	const cats = {
		Employment_Status: a.employmentStatus,
		Marital_Status: a.maritalStatus,
		Loan_Purpose: a.loanPurpose,
		Property_Area: a.propertyArea,
		Gender: a.gender,
		Employer_Category: a.employerCategory
	};
	for (const name of credit_model_default.features) {
		const group = Object.keys(GROUPS).find((g) => name.startsWith(`${g}_`));
		if (group) f[name] = name === `${group}_${cats[group]}` ? 1 : 0;
	}
	return f;
}
function predictApproval(a) {
	const f = buildFeatures(a);
	let z = credit_model_default.intercept;
	const grouped = /* @__PURE__ */ new Map();
	credit_model_default.features.forEach((name, i) => {
		const scaled = ((f[name] ?? 0) - (credit_model_default.mean[i] ?? 0)) / (credit_model_default.scale[i] ?? 1);
		const contribution = (credit_model_default.coef[i] ?? 0) * scaled;
		z += contribution;
		const group = Object.keys(GROUPS).find((g) => name.startsWith(`${g}_`));
		const label = (group ? GROUPS[group] : FRIENDLY[name]) ?? name;
		grouped.set(label, (grouped.get(label) ?? 0) + contribution);
	});
	const probability = 1 / (1 + Math.exp(-z));
	const factors = [...grouped.entries()].map(([label, impact]) => ({
		label,
		impact: Number(impact.toFixed(4))
	})).sort((x, y) => Math.abs(y.impact) - Math.abs(x.impact)).slice(0, 6);
	return {
		probability,
		approved: probability >= .5,
		factors
	};
}
//#endregion
//#region src/lib/predict.functions.ts?tss-serverfn-split
var predictLoan_createServerFn_handler = createServerRpc({
	id: "18c37edb4bde20a5c406a149e83efee805f5884457f4f8e84afd362a48d2e139",
	name: "predictLoan",
	filename: "src/lib/predict.functions.ts"
}, (opts) => predictLoan.__executeServer(opts));
var predictLoan = createServerFn({ method: "POST" }).validator((data) => applicantSchema.parse(data)).handler(predictLoan_createServerFn_handler, async ({ data }) => predictApproval(data));
//#endregion
export { predictLoan_createServerFn_handler };
