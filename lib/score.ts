import { DISCLAIMER_SHORT, HONESTY } from "./site";

export type RiskLevel = "HIGH" | "MED" | "LOW";

export type VisualStyle = "ai_slideshow" | "stock_mass" | "original_filmed" | "mixed";
export type Voiceover = "ai_voice" | "human_vo" | "text_only";
export type Scripts = "identical_template" | "researched_original" | "trend_recycled";
export type RevenueTiming = "before_ypp" | "after_ypp" | "not_counting";
export type Estimates = "as_income" | "as_guesses" | "unused";
export type Timeline = "ten_k_fast" | "multi_month" | "unsure";
export type Niche = "broad_storytime" | "researched_angle" | "mixed";

export type QuizAnswers = {
  visual: VisualStyle;
  voiceover: Voiceover;
  scripts: Scripts;
  revenueTiming: RevenueTiming;
  estimates: Estimates;
  timeline: Timeline;
  niche: Niche;
};

export type ScoreResult = {
  level: RiskLevel;
  title: string;
  summary: string;
  bullets: string[];
  myths: string[];
  score: number;
};

const LEVEL_COPY: Record<
  RiskLevel,
  { title: string; summary: string; myths: string[] }
> = {
  HIGH: {
    title: "High expectation + monetization risk",
    summary:
      "Your answers stack patterns that viral posts sell as a shortcut: mass AI visuals, synthetic main voice, template spam, counting money before YouTube Partner Program, or treating third-party estimates as income. Those raise both disappointment risk and policy risk. This card is educational, not a ban prediction.",
    myths: [
      "Claude Code + YouTube does not equal a guaranteed $62k/mo.",
      "VidIQ or SocialBlade estimates are not AdSense deposits.",
      "YouTube can limit or remove inauthentic, repetitive, or mass-produced content.",
    ],
  },
  MED: {
    title: "Mixed signals — tighten the plan",
    summary:
      "Some answers look careful (craft timeline, human voice, or treating estimates as guesses), but others still lean on shortcuts or early revenue fantasies. Expect slower growth than the viral posts claim, and finish a real YPP path before you count money.",
    myths: [
      "A medium label is not permission to farm identical AI slideshows.",
      "Estimates stay guesses until AdSense actually pays.",
      "Format variation and original scripts still matter for policy and audience trust.",
    ],
  },
  LOW: {
    title: "Lower expectation risk — still no guarantees",
    summary:
      "Your answers lean toward human voiceover, researched scripts, treating third-party numbers as guesses, planning for YPP before revenue, and a multi-month craft mindset. That lowers the chance you bought a fantasy. It does not guarantee views, revenue, or Partner Program approval.",
    myths: [
      "Low risk here is not a promise of AdSense income.",
      "YouTube still enforces rules on spam, reuse, and inauthentic content.",
      "Even careful channels can take months with little or no payout.",
    ],
  },
};

type Factor = {
  id: string;
  weight: number;
  raise: boolean;
  bullet: string;
};

function factorsFor(answers: QuizAnswers): Factor[] {
  const factors: Factor[] = [];

  if (answers.visual === "ai_slideshow") {
    factors.push({
      id: "ai-slideshow",
      weight: 4,
      raise: true,
      bullet:
        "AI image slideshow or MS-Paint-style mass images: high reuse / inauthentic-content risk and thin differentiation.",
    });
  } else if (answers.visual === "stock_mass") {
    factors.push({
      id: "stock-mass",
      weight: 3,
      raise: true,
      bullet:
        "Mass stock or near-identical image dumps look like template farming to both viewers and reviewers.",
    });
  } else if (answers.visual === "original_filmed") {
    factors.push({
      id: "original-visual",
      weight: 2,
      raise: false,
      bullet: "Original filmed or clearly authored visuals lower the mass-produced look.",
    });
  } else {
    factors.push({
      id: "mixed-visual",
      weight: 1,
      raise: true,
      bullet: "Mixed visuals help only if the channel is not still mostly slideshow spam.",
    });
  }

  if (answers.voiceover === "ai_voice") {
    factors.push({
      id: "ai-voice",
      weight: 3,
      raise: true,
      bullet:
        "AI voice as the main VO is a common faceless-farm pattern and can feel interchangeable at scale.",
    });
  } else if (answers.voiceover === "human_vo") {
    factors.push({
      id: "human-vo",
      weight: 2,
      raise: false,
      bullet: "Human voiceover is a meaningful craft signal versus pure synthetic narration.",
    });
  } else {
    factors.push({
      id: "text-only",
      weight: 1,
      raise: true,
      bullet: "Text-only videos still need original writing; templates alone do not create a durable channel.",
    });
  }

  if (answers.scripts === "identical_template") {
    factors.push({
      id: "identical-template",
      weight: 4,
      raise: true,
      bullet: "Identical template every video raises spam and mass-produced-content risk.",
    });
  } else if (answers.scripts === "researched_original") {
    factors.push({
      id: "researched-scripts",
      weight: 2,
      raise: false,
      bullet: "Original researched scripts are the main lever that is not a viral shortcut.",
    });
  } else {
    factors.push({
      id: "trend-recycled",
      weight: 2,
      raise: true,
      bullet: "Recycling the same trend script with light swaps still looks templated over time.",
    });
  }

  if (answers.revenueTiming === "before_ypp") {
    factors.push({
      id: "before-ypp",
      weight: 4,
      raise: true,
      bullet:
        "Expecting AdSense money before YPP (roughly 1,000 subs + 4,000 watch hours, or the Shorts path) is a fantasy timeline.",
    });
  } else if (answers.revenueTiming === "after_ypp") {
    factors.push({
      id: "after-ypp",
      weight: 2,
      raise: false,
      bullet: "Planning for YouTube Partner Program thresholds before counting revenue is the sane order.",
    });
  } else {
    factors.push({
      id: "not-counting",
      weight: 2,
      raise: false,
      bullet: "Not counting revenue yet keeps expectations closer to craft than to a paycheck.",
    });
  }

  if (answers.estimates === "as_income") {
    factors.push({
      id: "estimates-as-income",
      weight: 4,
      raise: true,
      bullet:
        "Treating VidIQ / SocialBlade-style estimates as income confuses a guess with AdSense.",
    });
  } else if (answers.estimates === "as_guesses") {
    factors.push({
      id: "estimates-as-guesses",
      weight: 2,
      raise: false,
      bullet: "Treating third-party estimates as guesses — not deposits — lowers expectation risk.",
    });
  } else {
    factors.push({
      id: "estimates-unused",
      weight: 1,
      raise: false,
      bullet: "Skipping estimate dashboards avoids anchoring on vanity RPM screenshots.",
    });
  }

  if (answers.timeline === "ten_k_fast") {
    factors.push({
      id: "ten-k-fast",
      weight: 5,
      raise: true,
      bullet:
        "Expecting $10k+/mo AdSense in 1–2 months matches the viral posts this scorecard pushes against.",
    });
  } else if (answers.timeline === "multi_month") {
    factors.push({
      id: "multi-month",
      weight: 2,
      raise: false,
      bullet: "A multi-month craft mindset matches how most durable channels actually grow.",
    });
  } else {
    factors.push({
      id: "timeline-unsure",
      weight: 1,
      raise: true,
      bullet: "Unsure timelines are fine; do not fill the gap with someone else's $62k screenshot.",
    });
  }

  if (answers.niche === "broad_storytime") {
    factors.push({
      id: "broad-storytime",
      weight: 3,
      raise: true,
      bullet:
        "Broad storytime with no original insight competes with infinite AI-generated same-plots.",
    });
  } else if (answers.niche === "researched_angle") {
    factors.push({
      id: "researched-angle",
      weight: 2,
      raise: false,
      bullet: "A researched niche with an original angle is harder to clone than generic storytime.",
    });
  } else {
    factors.push({
      id: "niche-mixed",
      weight: 1,
      raise: true,
      bullet: "A mixed niche still needs a clear reason a viewer should pick your version.",
    });
  }

  return factors;
}

function levelFromScore(score: number): RiskLevel {
  if (score >= 10) return "HIGH";
  if (score >= 4) return "MED";
  return "LOW";
}

/** Net risk score: raise weights add, lower weights subtract. Clamped ≥ 0. */
export function scoreQuiz(answers: QuizAnswers): ScoreResult {
  const factors = factorsFor(answers);
  const raw = factors.reduce((sum, factor) => sum + (factor.raise ? factor.weight : -factor.weight), 0);
  const score = Math.max(0, raw);
  const level = levelFromScore(score);
  const copy = LEVEL_COPY[level];

  const raiseBullets = factors.filter((f) => f.raise).map((f) => f.bullet);
  const lowerBullets = factors.filter((f) => !f.raise).map((f) => f.bullet);
  const bullets =
    level === "LOW"
      ? [...lowerBullets, ...raiseBullets].slice(0, 6)
      : [...raiseBullets, ...lowerBullets].slice(0, 6);

  return {
    level,
    title: copy.title,
    summary: copy.summary,
    bullets: bullets.length
      ? bullets
      : ["No strong signals either way — re-check the viral claim against a real YPP plan."],
    myths: copy.myths,
    score,
  };
}

export function summarizeScore(result: ScoreResult): string {
  const bullets = result.bullets.map((b) => `- ${b}`).join("\n");
  const myths = result.myths.map((m) => `- ${m}`).join("\n");
  return [
    `Faceless YT Reality Check — ${result.level}`,
    result.title,
    result.summary,
    "",
    "Signals:",
    bullets,
    "",
    "Myths to drop:",
    myths,
    "",
    `Score weight ${result.score}.`,
    DISCLAIMER_SHORT,
    HONESTY,
  ].join("\n");
}

/** Preset answer sets for demos and tests. */
export const sampleAnswers = {
  high: {
    visual: "ai_slideshow",
    voiceover: "ai_voice",
    scripts: "identical_template",
    revenueTiming: "before_ypp",
    estimates: "as_income",
    timeline: "ten_k_fast",
    niche: "broad_storytime",
  } satisfies QuizAnswers,
  med: {
    visual: "mixed",
    voiceover: "ai_voice",
    scripts: "trend_recycled",
    revenueTiming: "after_ypp",
    estimates: "as_guesses",
    timeline: "unsure",
    niche: "mixed",
  } satisfies QuizAnswers,
  low: {
    visual: "original_filmed",
    voiceover: "human_vo",
    scripts: "researched_original",
    revenueTiming: "not_counting",
    estimates: "as_guesses",
    timeline: "multi_month",
    niche: "researched_angle",
  } satisfies QuizAnswers,
} as const;
