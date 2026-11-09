# CreditWise — Agent Notes

## Project Overview

CreditWise is a full-stack loan approval prediction web app built with TanStack Start (React SSR).
It uses a Logistic Regression model trained on `loan_approval_data.csv` to predict
whether a loan applicant will be approved, along with the top factors driving the decision.

## Architecture Rules

- The loan model is trained offline in Python (`scripts/train_model.py`) and exported to
  `src/lib/model/credit-model.json` (scaler mean/scale + logistic coefficients).
  Inference runs in TypeScript in `src/lib/credit-model.server.ts` behind the `predictLoan`
  server function — the Worker runtime cannot run Python/sklearn.
- Feature engineering in the TypeScript scorer must mirror the notebook pipeline:
  one-hot drop-first, Education_Level label-encoded, DTI_Ratio and Credit_Score squared
  (raw columns dropped). Retrain and re-export the JSON whenever the dataset changes.
- Server functions use TanStack Start's `createServerFn` and are validated with Zod.
- All UI uses Tailwind CSS v4 + shadcn/ui components under `src/components/ui/`.

## Important Files

| File                              | Purpose                                     |
| --------------------------------- | ------------------------------------------- |
| `src/lib/credit-model.server.ts`  | TypeScript inference engine                 |
| `src/lib/model/credit-model.json` | Exported model weights & scaler             |
| `src/lib/applicant-schema.ts`     | Zod schema + TypeScript types for Applicant |
| `src/lib/predict.functions.ts`    | Server function wrapper                     |
| `src/lib/model-metrics.ts`        | Test-set metrics displayed in ModelLab      |
| `scripts/train_model.py`          | Python training script                      |
| `loan_approval_data.csv`          | Training dataset (place in project root)    |

## Project rules

- The loan model is trained offline in Python (`scripts/train_model.py`) and exported to `src/lib/model/credit-model.json` (scaler mean/scale + logistic coefficients); inference runs in TS in `src/lib/credit-model.server.ts` behind the `predictLoan` server function — the Worker runtime can't run Python/sklearn.
- Feature engineering in the TS scorer must mirror the notebook pipeline (one-hot drop-first, Education label-encoded, DTI/Credit squared); retrain and re-export the JSON whenever the dataset changes.
