import { describe, expect, it } from "vitest";
import { predictApproval } from "@/lib/credit-model.server";
import { defaultApplicant } from "@/lib/applicant-schema";

describe("credit model", () => {
  it("approves a strong applicant (credit 790, DTI 15%)", () => {
    const r = predictApproval({ ...defaultApplicant, creditScore: 790, dtiRatio: 0.15 });
    expect(r.approved).toBe(true);
    expect(r.probability).toBeGreaterThan(0.5);
  });

  it("declines a weak applicant (credit 560, DTI 58%)", () => {
    const r = predictApproval({ ...defaultApplicant, creditScore: 560, dtiRatio: 0.58 });
    expect(r.approved).toBe(false);
    expect(r.probability).toBeLessThan(0.5);
  });

  it("raising credit score raises approval odds", () => {
    const low = predictApproval({ ...defaultApplicant, creditScore: 620 });
    const high = predictApproval({ ...defaultApplicant, creditScore: 740 });
    expect(high.probability).toBeGreaterThan(low.probability);
  });
});
