// Test-set results copied from the CreditWise notebook (200 test rows, random_state=42).
export const MODEL_METRICS = {
  baseline: [
    { model: "Logistic Reg.", accuracy: 0.865, precision: 0.783, recall: 0.77, f1: 0.777 },
    { model: "KNN", accuracy: 0.76, precision: 0.627, recall: 0.525, f1: 0.571 },
    { model: "Naive Bayes", accuracy: 0.865, precision: 0.804, recall: 0.738, f1: 0.769 },
  ],
  engineered: [
    { model: "Logistic Reg.", accuracy: 0.88, precision: 0.785, recall: 0.836, f1: 0.81 },
    { model: "KNN", accuracy: 0.785, precision: 0.673, recall: 0.574, f1: 0.619 },
    { model: "Naive Bayes", accuracy: 0.86, precision: 0.811, recall: 0.705, f1: 0.754 },
  ],
} as const;
