import { scoreQuiz, summarizeScore, type QuizAnswers } from "./score";
import { oneOf, type Endpoint } from "./agent-api";
import { DISCLAIMER_SHORT, HONESTY, PUBLIC_URL, SITE_NAME, SITE_TAGLINE } from "./site";

export { PUBLIC_URL };
export const API_DISCLAIMER = `${DISCLAIMER_SHORT} ${HONESTY}`;
export const API_INFO = { title: `${SITE_NAME} API`, description: SITE_TAGLINE };

export const CHOICES = {
  visual: ["ai_slideshow", "stock_mass", "original_filmed", "mixed"],
  voiceover: ["ai_voice", "human_vo", "text_only"],
  scripts: ["identical_template", "researched_original", "trend_recycled"],
  revenueTiming: ["before_ypp", "after_ypp", "not_counting"],
  estimates: ["as_income", "as_guesses", "unused"],
  timeline: ["ten_k_fast", "multi_month", "unsure"],
  niche: ["broad_storytime", "researched_angle", "mixed"],
} as const;

const HELP: Record<keyof typeof CHOICES, string> = {
  visual: "Main visual style: AI image slideshow, mass stock footage, original filmed, or mixed.",
  voiceover: "Main voiceover: AI voice, human voiceover, or text only.",
  scripts: "Scripts: identical template each video, researched original, or recycled trend scripts.",
  revenueTiming: "When the creator expects money: before YouTube Partner Program, after YPP, or not counting yet.",
  estimates: "How VidIQ/SocialBlade-style earnings estimates are treated: as income, as guesses, or unused.",
  timeline: "Expected timeline: $10k+/month in 1-2 months, multi-month craft, or unsure.",
  niche: "Niche: broad storytime, researched angle, or mixed.",
};

export const ENDPOINTS: Record<"score", Endpoint> = {
  score: {
    path: "/api/score",
    operationId: "facelessYoutubeRealityCheck",
    summary: "Reality-check a faceless / AI YouTube channel plan for expectation and monetization-policy risk (HIGH / MED / LOW)",
    description:
      "Seven multiple-choice answers about visuals, voice, scripts, revenue timing, earnings estimates, timeline, and niche. Returns a HIGH / MED / LOW risk level, the signals that drove it, myths to drop, and a plain-text summary. Pushes back on viral 'Claude Code + YouTube = $10k/month' claims. Not a ban prediction.",
    params: (Object.keys(CHOICES) as (keyof typeof CHOICES)[]).map((k) => ({ name: k, type: "string" as const, required: true, enum: CHOICES[k], description: HELP[k] })),
    example: "/api/score?visual=ai_slideshow&voiceover=ai_voice&scripts=identical_template&revenueTiming=before_ypp&estimates=as_income&timeline=ten_k_fast&niche=broad_storytime",
    compute: (i) => {
      const answers = Object.fromEntries((Object.keys(CHOICES) as (keyof typeof CHOICES)[]).map((k) => [k, oneOf(i, k, CHOICES[k])])) as QuizAnswers;
      const result = scoreQuiz(answers);
      return { input: answers, result, summaryText: summarizeScore(result) };
    },
  },
};

export const PLUGIN = {
  name: SITE_NAME,
  nameForModel: "faceless_yt_reality_check",
  descriptionForHuman: "Reality check for faceless / AI YouTube channel plans and viral income claims.",
  descriptionForModel:
    "Use when a user plans a faceless or AI-generated YouTube channel, or asks whether viral 'AI YouTube automation makes $10k a month' claims are realistic. Returns a heuristic risk card. Relay the disclaimer: educational only, not financial or legal advice, not a ban prediction.",
  logo: "/icon.svg",
};
