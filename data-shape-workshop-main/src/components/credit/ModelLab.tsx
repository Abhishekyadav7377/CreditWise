import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MODEL_METRICS } from "@/lib/model-metrics";

const METRICS = [
  { key: "accuracy", label: "Accuracy", color: "var(--chart-1)" },
  { key: "precision", label: "Precision", color: "var(--chart-2)" },
  { key: "recall", label: "Recall", color: "var(--chart-3)" },
  { key: "f1", label: "F1", color: "var(--chart-5)" },
] as const;

export function ModelLab() {
  const [mode, setMode] = useState<"baseline" | "engineered">("engineered");
  const data = MODEL_METRICS[mode].map((m) => ({ ...m }));

  return (
    <section className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-brass">MODEL LAB</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Three models, one winner</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Results from your notebook on the 200-row test set. Logistic Regression powers the
            predictor above.
          </p>
        </div>
        <div className="inline-flex rounded-full border bg-muted p-1 text-sm">
          {(["baseline", "engineered"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "baseline" ? "Baseline" : "Feature-engineered"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="model"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 13 }}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              formatter={(v: number) => `${(v * 100).toFixed(1)}%`}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
            {METRICS.map((m) => (
              <Bar
                key={m.key}
                dataKey={m.key}
                name={m.label}
                fill={m.color}
                radius={[6, 6, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { k: "Top signal", v: "Credit score", d: "+0.45 correlation with approval" },
          { k: "Biggest risk", v: "Debt-to-income", d: "−0.44 correlation with approval" },
          { k: "Best accuracy", v: "88%", d: "Logistic Regression, engineered" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-secondary p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {s.k}
            </p>
            <p className="mt-1 font-display text-2xl">{s.v}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
