import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EDUCATION_LEVEL,
  EMPLOYER_CATEGORY,
  EMPLOYMENT_STATUS,
  GENDER,
  LOAN_PURPOSE,
  LOAN_TERMS,
  MARITAL_STATUS,
  PROPERTY_AREA,
  type Applicant,
} from "@/lib/applicant-schema";

type Props = {
  value: Applicant;
  onChange: (next: Applicant) => void;
};

function Section({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-brass">{step}</span>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "space-y-2 sm:col-span-2" : "space-y-2"}>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function ApplicantForm({ value, onChange }: Props) {
  const set = <K extends keyof Applicant>(key: K, v: Applicant[K]) =>
    onChange({ ...value, [key]: v });

  const num = (key: keyof Applicant, prefix?: string) => (
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {prefix}
        </span>
      )}
      <Input
        type="number"
        inputMode="decimal"
        min={0}
        className={`tabular h-11 bg-background ${prefix ? "pl-7" : ""}`}
        value={Number.isFinite(value[key] as number) ? (value[key] as number) : ""}
        onChange={(e) => set(key, (e.target.value === "" ? 0 : Number(e.target.value)) as never)}
      />
    </div>
  );

  const pick = <K extends keyof Applicant>(key: K, options: readonly (string | number)[]) => (
    <Select
      value={String(value[key])}
      onValueChange={(v) =>
        set(key, (typeof value[key] === "number" ? Number(v) : v) as Applicant[K])
      }
    >
      <SelectTrigger className="h-11 bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={String(o)}>
            {typeof o === "number" ? `${o} months` : o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="space-y-5">
      <Section step="01" title="Credit profile">
        <Field label={`Credit score · ${value.creditScore}`} wide>
          <Slider
            min={550}
            max={800}
            step={1}
            value={[value.creditScore]}
            onValueChange={([v]) => set("creditScore", v ?? value.creditScore)}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>550 · Poor</span>
            <span>800 · Excellent</span>
          </div>
        </Field>
        <Field label={`Debt-to-income · ${Math.round(value.dtiRatio * 100)}%`} wide>
          <Slider
            min={0.1}
            max={0.6}
            step={0.01}
            value={[value.dtiRatio]}
            onValueChange={([v]) => set("dtiRatio", v ?? value.dtiRatio)}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10% · Light</span>
            <span>60% · Heavy</span>
          </div>
        </Field>
        <Field label="Existing loans">{pick("existingLoans", [0, 1, 2, 3, 4].map(String))}</Field>
        <Field label="Savings">{num("savings", "₹")}</Field>
      </Section>

      <Section step="02" title="Income & work">
        <Field label="Applicant income / month">{num("applicantIncome", "₹")}</Field>
        <Field label="Co-applicant income / month">{num("coapplicantIncome", "₹")}</Field>
        <Field label="Employment status">{pick("employmentStatus", EMPLOYMENT_STATUS)}</Field>
        <Field label="Employer category">{pick("employerCategory", EMPLOYER_CATEGORY)}</Field>
      </Section>

      <Section step="03" title="The loan">
        <Field label="Loan amount">{num("loanAmount", "₹")}</Field>
        <Field label="Loan term">{pick("loanTerm", LOAN_TERMS)}</Field>
        <Field label="Purpose">{pick("loanPurpose", LOAN_PURPOSE)}</Field>
        <Field label="Collateral value">{num("collateralValue", "₹")}</Field>
        <Field label="Property area" wide>
          {pick("propertyArea", PROPERTY_AREA)}
        </Field>
      </Section>

      <Section step="04" title="About you">
        <Field label="Age">{num("age")}</Field>
        <Field label="Dependents">{pick("dependents", [0, 1, 2, 3].map(String))}</Field>
        <Field label="Education">{pick("educationLevel", EDUCATION_LEVEL)}</Field>
        <Field label="Marital status">{pick("maritalStatus", MARITAL_STATUS)}</Field>
        <Field label="Gender" wide>
          {pick("gender", GENDER)}
        </Field>
      </Section>
    </div>
  );
}
