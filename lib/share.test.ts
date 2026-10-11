import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CHOICES, ENDPOINTS } from "./api";
import { factorsFor, sampleAnswers, scoreQuiz, type QuizAnswers } from "./score";
import {
  ANSWER_KEYS,
  EXAMPLE_INPUTS,
  FACTOR_LABELS,
  driverLabels,
  isExample,
  ogPath,
  parseResultParams,
  resultFromInputs,
  resultHeadline,
  resultPath,
  resultQuery,
} from "./share";

const EXAMPLE_QUERY =
  "visual=ai_slideshow&voiceover=ai_voice&scripts=identical_template&revenueTiming=before_ypp&estimates=as_income&timeline=ten_k_fast&niche=broad_storytime";

function allAnswerSets(): QuizAnswers[] {
  let sets: Record<string, string>[] = [{}];
  for (const k of ANSWER_KEYS) sets = sets.flatMap((s) => CHOICES[k].map((v) => ({ ...s, [k]: v })));
  return sets as QuizAnswers[];
}

describe("share links", () => {
  it("example query is stable, matches the API example, and round-trips", () => {
    assert.equal(resultQuery(EXAMPLE_INPUTS), EXAMPLE_QUERY);
    assert.equal(ENDPOINTS.score.example, `/api/score?${EXAMPLE_QUERY}`);
    assert.deepEqual(EXAMPLE_INPUTS, sampleAnswers.high);
    assert.deepEqual(parseResultParams(new URLSearchParams(EXAMPLE_QUERY)), EXAMPLE_INPUTS);
    assert.equal(resultPath(EXAMPLE_INPUTS), `/r?${EXAMPLE_QUERY}`);
    assert.equal(ogPath(EXAMPLE_INPUTS), `/og?${EXAMPLE_QUERY}`);
    assert.ok(isExample(EXAMPLE_INPUTS));
    assert.ok(!isExample(sampleAnswers.low));
  });

  it("rebuilds exactly the same card as the quiz, for every answer combination", () => {
    for (const a of allAnswerSets()) {
      const parsed = parseResultParams(new URLSearchParams(resultQuery(a)));
      assert.deepEqual(parsed, a);
      assert.deepEqual(resultFromInputs(parsed!), scoreQuiz(a));
    }
  });

  it("every factor the scorer can produce has a chip label", () => {
    for (const a of allAnswerSets()) for (const f of factorsFor(a)) assert.ok(FACTOR_LABELS[f.id], f.id);
  });

  it("empty, partial, or invalid links return null; case and spaces are tolerated", () => {
    assert.equal(parseResultParams({}), null);
    assert.equal(parseResultParams(new URLSearchParams("visual=ai_slideshow")), null);
    assert.equal(parseResultParams(new URLSearchParams(EXAMPLE_QUERY.replace("ai_voice", "<script>"))), null);
    const loud = new URLSearchParams(EXAMPLE_QUERY.replace("ai_slideshow", " AI_SLIDESHOW "));
    assert.deepEqual(parseResultParams(loud), EXAMPLE_INPUTS);
    assert.deepEqual(parseResultParams({ ...Object.fromEntries(new URLSearchParams(EXAMPLE_QUERY)), visual: ["ai_slideshow", "x"] }), EXAMPLE_INPUTS);
  });

  it("links carry only the seven known answers", () => {
    const q = new URLSearchParams(resultQuery(sampleAnswers.med));
    assert.deepEqual([...q.keys()], ANSWER_KEYS);
    for (const [k, v] of q) assert.ok((CHOICES[k as keyof typeof CHOICES] as readonly string[]).includes(v));
  });

  it("headline comes from the answers and result only", () => {
    assert.equal(resultHeadline(EXAMPLE_INPUTS), "HIGH risk faceless YouTube plan: AI image slideshow, AI main voice +5 more");
    assert.equal(resultHeadline(sampleAnswers.low), "LOW risk faceless YouTube plan: Original visuals, Human voiceover +5 more");
    assert.deepEqual(driverLabels(sampleAnswers.low, "LOW").slice(0, 2), ["Original visuals", "Human voiceover"]);
  });

  it("API compute for the example gives the same result the share page renders", () => {
    const out = ENDPOINTS.score.compute(Object.fromEntries(new URLSearchParams(EXAMPLE_QUERY))) as { input: QuizAnswers; result: unknown };
    assert.deepEqual(out.input, EXAMPLE_INPUTS);
    assert.deepEqual(out.result, resultFromInputs(EXAMPLE_INPUTS));
  });
});
