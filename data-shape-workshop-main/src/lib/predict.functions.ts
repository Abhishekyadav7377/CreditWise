import { createServerFn } from "@tanstack/react-start";
import { applicantSchema } from "./applicant-schema";
import { predictApproval } from "./credit-model.server";

export const predictLoan = createServerFn({ method: "POST" })
  .validator((data: unknown) => applicantSchema.parse(data))
  .handler(async ({ data }) => predictApproval(data));
