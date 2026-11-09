import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { Prediction } from "@/lib/applicant-schema";

type Props = { result: Prediction | null; loading: boolean };

function Gauge({ value }: { value: number }) {
  const r = 78;
  const c = Math.PI * r; // half circle
  const pct = Math.max(0, Math.min(1, value));
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[260px]">
      <path
        d="M 22 100 A 78 78 0 0 1 178 100"
        fill="none"
        strokeWidth="14"
        strokeLinecap="round"
        className="stroke-ink-foreground/10"
      />
      <path
        d="M 22 100 A 78 78 0 0 1 178 100"
        fill="none"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        className={`transition-[stroke-dashoffset] duration-700 ease-out ${pct >= 0.5 ? "stroke-brass" : "stroke-destructive"}`}
      />
      <text
        x="100"
        y="92"
        textAnchor="middle"
        className="fill-ink-foreground font-display text-[40px] tabular"
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

export function ResultPanel({ result, loading }: Props) {
  const maxImpact = Math.max(0.01, ...(result?.factors.map((f) => Math.abs(f.impact)) ?? [0]));

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-gradient p-7 text-ink-foreground shadow-soft">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-glow rounded-full bg-brass/20 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Approval odds
        </p>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-brass" />}
      </div>

      {!result ? (
        <div className="relative py-16 text-center text-ink-muted">Scoring applicant…</div>
      ) : (
        <div className="relative">
          <div className="mt-4 flex justify-center">
            <Gauge value={result.probability} />
          </div>

          <div
            className={`mx-auto mt-2 flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
              result.approved
                ? "bg-brass-gradient text-accent-foreground shadow-brass"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            {result.approved ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {result.approved ? "Likely approved" : "Likely declined"}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              What moved the needle
            </p>
            <ul className="space-y-3">
              {result.factors.map((f) => {
                const width = `${(Math.abs(f.impact) / maxImpact) * 50}%`;
                const positive = f.impact >= 0;
                return (
                  <li key={f.label} className="text-sm">
                    <div className="mb-1 flex justify-between">
                      <span>{f.label}</span>
                      <span className={`tabular ${positive ? "text-brass" : "text-destructive"}`}>
                        {positive ? "+" : "−"}
                        {Math.abs(f.impact).toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-ink-foreground/10">
                      <div className="absolute left-1/2 top-[-3px] h-3 w-px bg-ink-foreground/30" />
                      <div
                        className={`absolute top-0 h-full rounded-full transition-all duration-500 ${
                          positive ? "left-1/2 bg-brass" : "right-1/2 bg-destructive"
                        }`}
                        style={{ width }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
