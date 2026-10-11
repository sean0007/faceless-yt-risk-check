import { CHOICES } from "./api";
import { factorsFor, scoreQuiz, type QuizAnswers, type ScoreResult } from "./score";
import { PUBLIC_URL } from "./site";

export { PUBLIC_URL };

/**
 * Share links carry only the seven multiple-choice answers, with the same parameter names and
 * values as /api/score. The quiz has no free-text field, so nothing personal can end up in a link.
 */
export const ANSWER_KEYS = Object.keys(CHOICES) as (keyof typeof CHOICES)[];

/** Example used in the sitemap, llms.txt, and the canary. Same answers as the /api/score example (the HIGH sample). */
export const EXAMPLE_INPUTS: QuizAnswers = {
  visual: "ai_slideshow",
  voiceover: "ai_voice",
  scripts: "identical_template",
  revenueTiming: "before_ypp",
  estimates: "as_income",
  timeline: "ten_k_fast",
  niche: "broad_storytime",
};

/** Short chip labels for each factor id the scorer can produce. */
export const FACTOR_LABELS: Record<string, string> = {
  "ai-slideshow": "AI image slideshow",
  "stock-mass": "Mass stock clips",
  "original-visual": "Original visuals",
  "mixed-visual": "Mixed visuals",
  "ai-voice": "AI main voice",
  "human-vo": "Human voiceover",
  "text-only": "Text-only videos",
  "identical-template": "Identical template scripts",
  "researched-scripts": "Researched scripts",
  "trend-recycled": "Recycled trend scripts",
  "before-ypp": "Money before YPP",
  "after-ypp": "Revenue after YPP",
  "not-counting": "Not counting revenue yet",
  "estimates-as-income": "Estimates as income",
  "estimates-as-guesses": "Estimates as guesses",
  "estimates-unused": "No estimate dashboards",
  "ten-k-fast": "$10k/mo in 1-2 months",
  "multi-month": "Multi-month craft",
  "timeline-unsure": "Unsure timeline",
  "broad-storytime": "Broad storytime",
  "researched-angle": "Researched angle",
  "niche-mixed": "Mixed niche",
};

type Params = URLSearchParams | Record<string, string | string[] | undefined>;

function get(p: Params, key: string): string | undefined {
  if (p instanceof URLSearchParams) return p.get(key) ?? undefined;
  const v = p[key];
  return Array.isArray(v) ? v[0] : v;
}

/** Reads a share link. Returns null unless all seven answers are present and allowed (empty or partial /r goes home). */
export function parseResultParams(p: Params): QuizAnswers | null {
  const out: Record<string, string> = {};
  for (const k of ANSWER_KEYS) {
    const v = get(p, k)?.trim().toLowerCase();
    if (!v || !(CHOICES[k] as readonly string[]).includes(v)) return null;
    out[k] = v;
  }
  return out as QuizAnswers;
}

export function resultQuery(a: QuizAnswers): string {
  const q = new URLSearchParams();
  for (const k of ANSWER_KEYS) q.set(k, a[k]);
  return q.toString();
}

export const resultFromInputs = (a: QuizAnswers): ScoreResult => scoreQuiz(a);
export const resultPath = (a: QuizAnswers) => `/r?${resultQuery(a)}`;
export const ogPath = (a: QuizAnswers) => `/og?${resultQuery(a)}`;
export const isExample = (a: QuizAnswers) => resultQuery(a) === resultQuery(EXAMPLE_INPUTS);

/** Chips for the card: risk drivers first for HIGH/MED, strengths first for LOW (same order as the scorer's bullets). */
export function driverLabels(a: QuizAnswers, level: ScoreResult["level"]): string[] {
  const factors = factorsFor(a);
  const raise = factors.filter((f) => f.raise);
  const lower = factors.filter((f) => !f.raise);
  const ordered = level === "LOW" ? [...lower, ...raise] : [...raise, ...lower];
  return ordered.map((f) => FACTOR_LABELS[f.id] ?? f.id);
}

/** Headline for <title>, H1, and share text, built only from the answers and the scorer's result. */
export function resultHeadline(a: QuizAnswers, r: ScoreResult = scoreQuiz(a)): string {
  const labels = driverLabels(a, r.level);
  const what = labels.length > 2 ? `${labels.slice(0, 2).join(", ")} +${labels.length - 2} more` : labels.join(" + ");
  return `${r.level} risk faceless YouTube plan: ${what}`;
}
