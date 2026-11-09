import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { ApplicantForm } from "@/components/credit/ApplicantForm";
import { ResultPanel } from "@/components/credit/ResultPanel";
import { ModelLab } from "@/components/credit/ModelLab";
import { defaultApplicant, type Applicant, type Prediction } from "@/lib/applicant-schema";
import { predictLoan } from "@/lib/predict.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreditWise — Instant Loan Approval Predictor" },
      {
        name: "description",
        content:
          "Enter an applicant's profile and see their loan approval odds instantly, powered by a Logistic Regression model.",
      },
      { property: "og:title", content: "CreditWise — Instant Loan Approval Predictor" },
      {
        property: "og:description",
        content: "See loan approval odds and the factors behind them in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const predict = useServerFn(predictLoan);
  const [applicant, setApplicant] = useState<Applicant>(defaultApplicant);
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    const t = setTimeout(() => {
      predict({ data: applicant })
        .then((r) => {
          if (id === reqId.current) setResult(r);
        })
        .catch((e) => console.error("Prediction failed", e))
        .finally(() => {
          if (id === reqId.current) setLoading(false);
        });
    }, 250);
    return () => clearTimeout(t);
  }, [applicant, predict]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 animate-glow rounded-full bg-brass/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-display text-xl">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brass-gradient text-accent-foreground">
                <ShieldCheck className="h-4 w-4" />
              </span>
              CreditWise
            </div>
            <span className="rounded-full border border-ink-foreground/15 px-3 py-1 text-xs text-ink-muted">
              Logistic Regression · 88% accuracy
            </span>
          </nav>

          <div className="mt-20 max-w-3xl animate-rise">
            <p className="font-mono text-xs tracking-widest text-brass">
              LOAN APPROVAL INTELLIGENCE
            </p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">
              Know the answer <em className="text-brass">before</em> you apply.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">
              Adjust the applicant's profile and watch the approval odds update live — along with
              exactly what's helping and hurting.
            </p>
            <a
              href="#predict"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brass-gradient px-6 py-3 font-semibold text-accent-foreground shadow-brass transition-transform hover:-translate-y-0.5"
            >
              Check approval odds <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-ink-foreground/10 pt-8">
            {[
              ["1,000", "applicants studied"],
              ["27", "signals per profile"],
              ["0.81", "F1 score"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl tabular">{v}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Predictor */}
      <section id="predict" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-16">
        <div className="mb-10">
          <p className="font-mono text-xs text-brass">PREDICTOR</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Build the applicant</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ApplicantForm value={applicant} onChange={setApplicant} />
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ResultPanel result={result} loading={loading} />
            <p className="mt-4 px-2 text-xs leading-relaxed text-muted-foreground">
              Model trained on 1,000 real loan applications. Credit score and DTI ratio are the
              strongest predictors of approval.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ModelLab />
      </div>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        CreditWise · Predictions are estimates, not lending decisions.
      </footer>
    </main>
  );
}
