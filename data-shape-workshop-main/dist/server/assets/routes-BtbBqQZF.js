import { p as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-klzoUz4R.js";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-C463UpmG.js";
import { a as LOAN_PURPOSE, c as PROPERTY_AREA, i as GENDER, l as applicantSchema, n as EMPLOYER_CATEGORY, o as LOAN_TERMS, r as EMPLOYMENT_STATUS, s as MARITAL_STATUS, t as EDUCATION_LEVEL, u as defaultApplicant } from "./applicant-schema-BJ62E6Jy.js";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, Check, CheckCircle2, ChevronDown, ChevronUp, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region node_modules/.pnpm/@tanstack+react-start@1.168_636e230dc3fd15a8fde1faa93b30a290/node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/slider.tsx
var Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = SliderPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/credit/ApplicantForm.tsx
function Section({ step, title, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-2xl border bg-card p-6 shadow-soft",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-5 flex items-baseline gap-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-mono text-xs text-brass",
				children: step
			}), /* @__PURE__ */ jsx("h3", {
				className: "text-xl font-medium",
				children: title
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-5 sm:grid-cols-2",
			children
		})]
	});
}
function Field({ label, children, wide }) {
	return /* @__PURE__ */ jsxs("div", {
		className: wide ? "space-y-2 sm:col-span-2" : "space-y-2",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
function ApplicantForm({ value, onChange }) {
	const set = (key, v) => onChange({
		...value,
		[key]: v
	});
	const num = (key, prefix) => /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [prefix && /* @__PURE__ */ jsx("span", {
			className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
			children: prefix
		}), /* @__PURE__ */ jsx(Input, {
			type: "number",
			inputMode: "decimal",
			min: 0,
			className: `tabular h-11 bg-background ${prefix ? "pl-7" : ""}`,
			value: Number.isFinite(value[key]) ? value[key] : "",
			onChange: (e) => set(key, e.target.value === "" ? 0 : Number(e.target.value))
		})]
	});
	const pick = (key, options) => /* @__PURE__ */ jsxs(Select, {
		value: String(value[key]),
		onValueChange: (v) => set(key, typeof value[key] === "number" ? Number(v) : v),
		children: [/* @__PURE__ */ jsx(SelectTrigger, {
			className: "h-11 bg-background",
			children: /* @__PURE__ */ jsx(SelectValue, {})
		}), /* @__PURE__ */ jsx(SelectContent, { children: options.map((o) => /* @__PURE__ */ jsx(SelectItem, {
			value: String(o),
			children: typeof o === "number" ? `${o} months` : o
		}, o)) })]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs(Section, {
				step: "01",
				title: "Credit profile",
				children: [
					/* @__PURE__ */ jsxs(Field, {
						label: `Credit score · ${value.creditScore}`,
						wide: true,
						children: [/* @__PURE__ */ jsx(Slider, {
							min: 550,
							max: 800,
							step: 1,
							value: [value.creditScore],
							onValueChange: ([v]) => set("creditScore", v ?? value.creditScore),
							className: "py-2"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx("span", { children: "550 · Poor" }), /* @__PURE__ */ jsx("span", { children: "800 · Excellent" })]
						})]
					}),
					/* @__PURE__ */ jsxs(Field, {
						label: `Debt-to-income · ${Math.round(value.dtiRatio * 100)}%`,
						wide: true,
						children: [/* @__PURE__ */ jsx(Slider, {
							min: .1,
							max: .6,
							step: .01,
							value: [value.dtiRatio],
							onValueChange: ([v]) => set("dtiRatio", v ?? value.dtiRatio),
							className: "py-2"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx("span", { children: "10% · Light" }), /* @__PURE__ */ jsx("span", { children: "60% · Heavy" })]
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Existing loans",
						children: pick("existingLoans", [
							0,
							1,
							2,
							3,
							4
						].map(String))
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Savings",
						children: num("savings", "₹")
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				step: "02",
				title: "Income & work",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Applicant income / month",
						children: num("applicantIncome", "₹")
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Co-applicant income / month",
						children: num("coapplicantIncome", "₹")
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Employment status",
						children: pick("employmentStatus", EMPLOYMENT_STATUS)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Employer category",
						children: pick("employerCategory", EMPLOYER_CATEGORY)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				step: "03",
				title: "The loan",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Loan amount",
						children: num("loanAmount", "₹")
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Loan term",
						children: pick("loanTerm", LOAN_TERMS)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Purpose",
						children: pick("loanPurpose", LOAN_PURPOSE)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Collateral value",
						children: num("collateralValue", "₹")
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Property area",
						wide: true,
						children: pick("propertyArea", PROPERTY_AREA)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				step: "04",
				title: "About you",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Age",
						children: num("age")
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Dependents",
						children: pick("dependents", [
							0,
							1,
							2,
							3
						].map(String))
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Education",
						children: pick("educationLevel", EDUCATION_LEVEL)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Marital status",
						children: pick("maritalStatus", MARITAL_STATUS)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Gender",
						wide: true,
						children: pick("gender", GENDER)
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/credit/ResultPanel.tsx
function Gauge({ value }) {
	const c = Math.PI * 78;
	const pct = Math.max(0, Math.min(1, value));
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 200 120",
		className: "w-full max-w-[260px]",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M 22 100 A 78 78 0 0 1 178 100",
				fill: "none",
				strokeWidth: "14",
				strokeLinecap: "round",
				className: "stroke-ink-foreground/10"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M 22 100 A 78 78 0 0 1 178 100",
				fill: "none",
				strokeWidth: "14",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - pct),
				className: `transition-[stroke-dashoffset] duration-700 ease-out ${pct >= .5 ? "stroke-brass" : "stroke-destructive"}`
			}),
			/* @__PURE__ */ jsxs("text", {
				x: "100",
				y: "92",
				textAnchor: "middle",
				className: "fill-ink-foreground font-display text-[40px] tabular",
				children: [Math.round(pct * 100), "%"]
			})
		]
	});
}
function ResultPanel({ result, loading }) {
	const maxImpact = Math.max(.01, ...result?.factors.map((f) => Math.abs(f.impact)) ?? [0]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative overflow-hidden rounded-3xl bg-ink-gradient p-7 text-ink-foreground shadow-soft",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-glow rounded-full bg-brass/20 blur-3xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted",
					children: "Approval odds"
				}), loading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-brass" })]
			}),
			!result ? /* @__PURE__ */ jsx("div", {
				className: "relative py-16 text-center text-ink-muted",
				children: "Scoring applicant…"
			}) : /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 flex justify-center",
						children: /* @__PURE__ */ jsx(Gauge, { value: result.probability })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: `mx-auto mt-2 flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${result.approved ? "bg-brass-gradient text-accent-foreground shadow-brass" : "bg-destructive text-destructive-foreground"}`,
						children: [result.approved ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }), result.approved ? "Likely approved" : "Likely declined"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted",
							children: "What moved the needle"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-3",
							children: result.factors.map((f) => {
								const width = `${Math.abs(f.impact) / maxImpact * 50}%`;
								const positive = f.impact >= 0;
								return /* @__PURE__ */ jsxs("li", {
									className: "text-sm",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-1 flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: f.label }), /* @__PURE__ */ jsxs("span", {
											className: `tabular ${positive ? "text-brass" : "text-destructive"}`,
											children: [positive ? "+" : "−", Math.abs(f.impact).toFixed(2)]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "relative h-1.5 rounded-full bg-ink-foreground/10",
										children: [/* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[-3px] h-3 w-px bg-ink-foreground/30" }), /* @__PURE__ */ jsx("div", {
											className: `absolute top-0 h-full rounded-full transition-all duration-500 ${positive ? "left-1/2 bg-brass" : "right-1/2 bg-destructive"}`,
											style: { width }
										})]
									})]
								}, f.label);
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/lib/model-metrics.ts
var MODEL_METRICS = {
	baseline: [
		{
			model: "Logistic Reg.",
			accuracy: .865,
			precision: .783,
			recall: .77,
			f1: .777
		},
		{
			model: "KNN",
			accuracy: .76,
			precision: .627,
			recall: .525,
			f1: .571
		},
		{
			model: "Naive Bayes",
			accuracy: .865,
			precision: .804,
			recall: .738,
			f1: .769
		}
	],
	engineered: [
		{
			model: "Logistic Reg.",
			accuracy: .88,
			precision: .785,
			recall: .836,
			f1: .81
		},
		{
			model: "KNN",
			accuracy: .785,
			precision: .673,
			recall: .574,
			f1: .619
		},
		{
			model: "Naive Bayes",
			accuracy: .86,
			precision: .811,
			recall: .705,
			f1: .754
		}
	]
};
//#endregion
//#region src/components/credit/ModelLab.tsx
var METRICS = [
	{
		key: "accuracy",
		label: "Accuracy",
		color: "var(--chart-1)"
	},
	{
		key: "precision",
		label: "Precision",
		color: "var(--chart-2)"
	},
	{
		key: "recall",
		label: "Recall",
		color: "var(--chart-3)"
	},
	{
		key: "f1",
		label: "F1",
		color: "var(--chart-5)"
	}
];
function ModelLab() {
	const [mode, setMode] = useState("engineered");
	const data = MODEL_METRICS[mode].map((m) => ({ ...m }));
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-3xl border bg-card p-6 shadow-soft md:p-10",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-mono text-xs text-brass",
						children: "MODEL LAB"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-3xl md:text-4xl",
						children: "Three models, one winner"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-md text-muted-foreground",
						children: "Results from your notebook on the 200-row test set. Logistic Regression powers the predictor above."
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "inline-flex rounded-full border bg-muted p-1 text-sm",
					children: ["baseline", "engineered"].map((m) => /* @__PURE__ */ jsx("button", {
						onClick: () => setMode(m),
						className: `rounded-full px-4 py-1.5 font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
						children: m === "baseline" ? "Baseline" : "Feature-engineered"
					}, m))
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 h-72",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(BarChart, {
						data,
						barGap: 4,
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								vertical: false,
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "model",
								tickLine: false,
								axisLine: false,
								tick: {
									fill: "var(--muted-foreground)",
									fontSize: 13
								}
							}),
							/* @__PURE__ */ jsx(YAxis, {
								domain: [0, 1],
								tickFormatter: (v) => `${Math.round(v * 100)}%`,
								tickLine: false,
								axisLine: false,
								tick: {
									fill: "var(--muted-foreground)",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								cursor: { fill: "var(--muted)" },
								formatter: (v) => `${(v * 100).toFixed(1)}%`,
								contentStyle: {
									background: "var(--card)",
									border: "1px solid var(--border)",
									borderRadius: 12
								}
							}),
							/* @__PURE__ */ jsx(Legend, {
								iconType: "circle",
								wrapperStyle: { fontSize: 13 }
							}),
							METRICS.map((m) => /* @__PURE__ */ jsx(Bar, {
								dataKey: m.key,
								name: m.label,
								fill: m.color,
								radius: [
									6,
									6,
									0,
									0
								]
							}, m.key))
						]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					{
						k: "Top signal",
						v: "Credit score",
						d: "+0.45 correlation with approval"
					},
					{
						k: "Biggest risk",
						v: "Debt-to-income",
						d: "−0.44 correlation with approval"
					},
					{
						k: "Best accuracy",
						v: "88%",
						d: "Logistic Regression, engineered"
					}
				].map((s) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl bg-secondary p-5",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: s.k
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 font-display text-2xl",
							children: s.v
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: s.d
						})
					]
				}, s.k))
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core_6d6effdb6849c4138fe521b37be145b9/node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/predict.functions.ts
var predictLoan = createServerFn({ method: "POST" }).validator((data) => applicantSchema.parse(data)).handler(createSsrRpc("18c37edb4bde20a5c406a149e83efee805f5884457f4f8e84afd362a48d2e139"));
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	const predict = useServerFn(predictLoan);
	const [applicant, setApplicant] = useState(defaultApplicant);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const reqId = useRef(0);
	useEffect(() => {
		const id = ++reqId.current;
		setLoading(true);
		const t = setTimeout(() => {
			predict({ data: applicant }).then((r) => {
				if (id === reqId.current) setResult(r);
			}).catch((e) => console.error("Prediction failed", e)).finally(() => {
				if (id === reqId.current) setLoading(false);
			});
		}, 250);
		return () => clearTimeout(t);
	}, [applicant, predict]);
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "relative overflow-hidden bg-ink-gradient text-ink-foreground",
				children: [/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-24 bottom-0 h-72 w-72 animate-glow rounded-full bg-brass/15 blur-3xl" }), /* @__PURE__ */ jsxs("div", {
					className: "relative mx-auto max-w-6xl px-6 pb-20 pt-8",
					children: [
						/* @__PURE__ */ jsxs("nav", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 font-display text-xl",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-8 w-8 place-items-center rounded-lg bg-brass-gradient text-accent-foreground",
									children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" })
								}), "CreditWise"]
							}), /* @__PURE__ */ jsx("span", {
								className: "rounded-full border border-ink-foreground/15 px-3 py-1 text-xs text-ink-muted",
								children: "Logistic Regression · 88% accuracy"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-20 max-w-3xl animate-rise",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-mono text-xs tracking-widest text-brass",
									children: "LOAN APPROVAL INTELLIGENCE"
								}),
								/* @__PURE__ */ jsxs("h1", {
									className: "mt-4 text-5xl leading-[1.05] md:text-7xl",
									children: [
										"Know the answer ",
										/* @__PURE__ */ jsx("em", {
											className: "text-brass",
											children: "before"
										}),
										" you apply."
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-6 max-w-xl text-lg text-ink-muted",
									children: "Adjust the applicant's profile and watch the approval odds update live — along with exactly what's helping and hurting."
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "#predict",
									className: "mt-10 inline-flex items-center gap-2 rounded-full bg-brass-gradient px-6 py-3 font-semibold text-accent-foreground shadow-brass transition-transform hover:-translate-y-0.5",
									children: ["Check approval odds ", /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" })]
								})
							]
						}),
						/* @__PURE__ */ jsx("dl", {
							className: "mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-ink-foreground/10 pt-8",
							children: [
								["1,000", "applicants studied"],
								["27", "signals per profile"],
								["0.81", "F1 score"]
							].map(([v, l]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
								className: "font-display text-3xl tabular",
								children: v
							}), /* @__PURE__ */ jsx("dd", {
								className: "mt-1 text-sm text-ink-muted",
								children: l
							})] }, l))
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "predict",
				className: "mx-auto max-w-6xl scroll-mt-6 px-6 py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-mono text-xs text-brass",
						children: "PREDICTOR"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-3xl md:text-4xl",
						children: "Build the applicant"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 lg:grid-cols-[1fr_380px]",
					children: [/* @__PURE__ */ jsx(ApplicantForm, {
						value: applicant,
						onChange: setApplicant
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:sticky lg:top-6 lg:self-start",
						children: [/* @__PURE__ */ jsx(ResultPanel, {
							result,
							loading
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-4 px-2 text-xs leading-relaxed text-muted-foreground",
							children: "Model trained on 1,000 real loan applications. Credit score and DTI ratio are the strongest predictors of approval."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-6xl px-6 pb-20",
				children: /* @__PURE__ */ jsx(ModelLab, {})
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t py-8 text-center text-sm text-muted-foreground",
				children: "CreditWise · Predictions are estimates, not lending decisions."
			})
		]
	});
}
//#endregion
export { Index as component };
