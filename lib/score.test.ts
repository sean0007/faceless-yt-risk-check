import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sampleAnswers, scoreQuiz, summarizeScore, type QuizAnswers } from "./score";

describe("scoreQuiz", () => {
  it("labels the high sample as HIGH with a large weight", () => {
    const result = scoreQuiz(sampleAnswers.high);
    assert.equal(result.level, "HIGH");
    assert.ok(result.score >= 10);
    assert.match(result.title, /High/i);
    assert.ok(result.bullets.length >= 3);
    assert.ok(result.myths.some((m) => /VidIQ|SocialBlade/i.test(m)));
    assert.match(summarizeScore(result), /Not financial or legal advice/);
  });

  it("labels the low sample as LOW", () => {
    const result = scoreQuiz(sampleAnswers.low);
    assert.equal(result.level, "LOW");
    assert.ok(result.score < 4);
    assert.match(result.summary, /human voiceover|researched|multi-month/i);
    assert.ok(result.bullets.some((b) => /human voiceover|researched|YPP|guesses|multi-month/i.test(b)));
  });

  it("labels the med sample as MED", () => {
    const result = scoreQuiz(sampleAnswers.med);
    assert.equal(result.level, "MED");
    assert.ok(result.score >= 4 && result.score < 10);
  });

  it("raises risk for AI slideshow + before YPP + estimates as income", () => {
    const answers: QuizAnswers = {
      ...sampleAnswers.low,
      visual: "ai_slideshow",
      revenueTiming: "before_ypp",
      estimates: "as_income",
      timeline: "ten_k_fast",
    };
    const result = scoreQuiz(answers);
    assert.equal(result.level, "HIGH");
    assert.ok(result.bullets.some((b) => /slideshow|YPP|VidIQ|SocialBlade|\$10k/i.test(b)));
  });

  it("lowers risk for human VO + researched scripts + multi-month craft", () => {
    const result = scoreQuiz({
      visual: "original_filmed",
      voiceover: "human_vo",
      scripts: "researched_original",
      revenueTiming: "after_ypp",
      estimates: "unused",
      timeline: "multi_month",
      niche: "researched_angle",
    });
    assert.equal(result.level, "LOW");
    assert.ok(result.score <= 2);
  });

  it("mentions inauthentic / mass-produced policy risk in HIGH myths", () => {
    const result = scoreQuiz(sampleAnswers.high);
    assert.ok(result.myths.some((m) => /inauthentic|mass-produced/i.test(m)));
  });

  it("never promises earnings as a forecast", () => {
    for (const sample of Object.values(sampleAnswers)) {
      const text = summarizeScore(scoreQuiz(sample)).toLowerCase();
      assert.equal(/you will (?:earn|make) \$|guarantees? (?:you|income|revenue|adsense)/.test(text), false);
      assert.equal(/not financial or legal advice/.test(text), true);
    }
  });
});
