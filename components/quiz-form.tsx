"use client";

import { useMemo, useState } from "react";
import { ResultCard } from "@/components/result-card";
import {
  sampleAnswers,
  scoreQuiz,
  type Estimates,
  type Niche,
  type QuizAnswers,
  type RevenueTiming,
  type ScoreResult,
  type Scripts,
  type Timeline,
  type VisualStyle,
  type Voiceover,
} from "@/lib/score";

type Question<T extends string> = {
  id: keyof QuizAnswers;
  label: string;
  help: string;
  options: { value: T; label: string }[];
};

const questions: [
  Question<VisualStyle>,
  Question<Voiceover>,
  Question<Scripts>,
  Question<RevenueTiming>,
  Question<Estimates>,
  Question<Timeline>,
  Question<Niche>,
] = [
  {
    id: "visual",
    label: "What do the videos look like?",
    help: "Mass AI / paint slideshows are the pattern viral posts sell as passive income.",
    options: [
      { value: "ai_slideshow", label: "AI image slideshow / MS-Paint mass images" },
      { value: "stock_mass", label: "Mass stock clips or near-identical image dumps" },
      { value: "mixed", label: "Mix of stock and occasional original visuals" },
      { value: "original_filmed", label: "Mostly original filmed or clearly authored visuals" },
    ],
  },
  {
    id: "voiceover",
    label: "Who narrates the main voiceover?",
    help: "Synthetic main VO is common in faceless farms; human VO is a craft signal.",
    options: [
      { value: "ai_voice", label: "AI voice for the main VO" },
      { value: "text_only", label: "Text on screen only" },
      { value: "human_vo", label: "Human voiceover" },
    ],
  },
  {
    id: "scripts",
    label: "How are scripts made?",
    help: "Identical templates every upload raise spam and mass-produced risk.",
    options: [
      { value: "identical_template", label: "Identical template every video" },
      { value: "trend_recycled", label: "Trend scripts with light swaps" },
      { value: "researched_original", label: "Original researched scripts" },
    ],
  },
  {
    id: "revenueTiming",
    label: "When do you count AdSense money?",
    help: "YPP is roughly 1,000 subscribers + 4,000 watch hours, or the Shorts path — not day one.",
    options: [
      { value: "before_ypp", label: "Expecting money before YPP" },
      { value: "after_ypp", label: "Only after a real YPP plan" },
      { value: "not_counting", label: "Not counting revenue yet" },
    ],
  },
  {
    id: "estimates",
    label: "How do you treat VidIQ / SocialBlade numbers?",
    help: "Those tools estimate. They are not your AdSense balance.",
    options: [
      { value: "as_income", label: "As income I can count on" },
      { value: "as_guesses", label: "As rough guesses only" },
      { value: "unused", label: "I do not use them" },
    ],
  },
  {
    id: "timeline",
    label: "What income timeline are you holding?",
    help: "Viral posts often imply $10k+/mo in weeks. Durable channels usually do not.",
    options: [
      { value: "ten_k_fast", label: "$10k+/mo AdSense in 1–2 months" },
      { value: "unsure", label: "Unsure — still figuring it out" },
      { value: "multi_month", label: "Multi-month craft, no instant paycheck" },
    ],
  },
  {
    id: "niche",
    label: "What is the content angle?",
    help: "Broad storytime with no original insight is easy to clone with AI.",
    options: [
      { value: "broad_storytime", label: "Broad storytime with no original insight" },
      { value: "mixed", label: "Mixed / still exploring" },
      { value: "researched_angle", label: "Researched niche with an original angle" },
    ],
  },
];

const blank: QuizAnswers = {
  visual: "mixed",
  voiceover: "ai_voice",
  scripts: "trend_recycled",
  revenueTiming: "before_ypp",
  estimates: "as_income",
  timeline: "unsure",
  niche: "mixed",
};

export function QuizForm() {
  const [answers, setAnswers] = useState<QuizAnswers>(blank);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const answeredCount = useMemo(() => questions.length, []);

  function setField<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function run(next: QuizAnswers) {
    setResult(scoreQuiz(next));
  }

  return (
    <div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <fieldset key={question.id} className="rounded-3xl border border-line bg-panel/60 p-5">
            <legend className="px-1 font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
              Q{String(index + 1).padStart(2, "0")}
            </legend>
            <p className="mt-1 text-base font-semibold text-foreground">{question.label}</p>
            <p className="mt-1 text-sm text-muted">{question.help}</p>
            <div className="mt-4 grid gap-2" role="radiogroup" aria-label={question.label}>
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed transition ${
                      selected
                        ? "border-amber/60 bg-amber/10 text-foreground"
                        : "border-white/10 bg-black/20 text-muted hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      className="mt-1 accent-[#f0b429]"
                      name={question.id}
                      value={option.value}
                      checked={selected}
                      onChange={() =>
                        setField(question.id, option.value as QuizAnswers[typeof question.id])
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => run(answers)}
          className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber/90"
        >
          Check my reality
        </button>
        <div className="flex flex-wrap gap-2" aria-label="Sample answer sets">
          {(
            [
              ["high", "HIGH sample"],
              ["med", "MED sample"],
              ["low", "LOW sample"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                const next = { ...sampleAnswers[key] };
                setAnswers(next);
                run(next);
              }}
              className="rounded-full border border-white/15 px-3 py-2 text-xs text-muted hover:bg-white/5 hover:text-foreground"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="w-full text-xs text-muted sm:w-auto">
          {answeredCount} questions. Scored in the browser. Nothing is uploaded.
        </p>
      </div>

      <div aria-live="polite">{result ? <ResultCard result={result} /> : null}</div>
    </div>
  );
}
