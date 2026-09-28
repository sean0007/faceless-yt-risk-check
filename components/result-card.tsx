"use client";

import { useState } from "react";
import { CardDisclaimer } from "@/components/card-disclaimer";
import { summarizeScore, type ScoreResult } from "@/lib/score";

const levelClass: Record<ScoreResult["level"], string> = {
  HIGH: "text-rose-300",
  MED: "text-amber",
  LOW: "text-teal-200",
};

export function ResultCard({ result }: { result: ScoreResult }) {
  const [copied, setCopied] = useState(false);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summarizeScore(result));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6">
      <article
        data-testid="risk-card"
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e14] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="border-b border-white/10 px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
              Faceless YT Reality Check
            </p>
            <p className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted">
              Expectation risk
            </p>
          </div>
          <p
            className={`mt-5 font-display text-6xl leading-none tracking-tight sm:text-7xl ${levelClass[result.level]}`}
          >
            {result.level}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{result.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{result.summary}</p>
          <p className="mt-3 font-mono text-[11px] tracking-wide text-muted">
            Score weight {result.score}. Heuristic only — not a YouTube audit and not a revenue forecast.
          </p>
        </div>
        <div className="grid gap-6 px-5 py-5 sm:px-7 lg:grid-cols-2">
          <section>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">Signals</h3>
            <ul className="mt-3 space-y-3">
              {result.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-muted"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              Myths to drop
            </h3>
            <ol className="mt-3 space-y-3">
              {result.myths.map((myth, index) => (
                <li key={myth} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <span>{myth}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <CardDisclaimer />
      </article>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copySummary}
          className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
        >
          {copied ? "Copied" : "Copy summary"}
        </button>
        <p className="text-xs text-muted">
          Screenshot-friendly card. No account data, no fake earnings chart.
        </p>
      </div>
    </div>
  );
}
