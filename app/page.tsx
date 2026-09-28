import { QuizForm } from "@/components/quiz-form";
import { SponsorSlot } from "@/components/sponsor-slot";

const levels = [
  {
    level: "HIGH",
    className: "text-rose-300",
    text: "AI slideshow farms, AI main VO, identical templates, money before YPP, VidIQ-as-income, or $10k/mo in weeks.",
  },
  {
    level: "MED",
    className: "text-amber",
    text: "Mixed craft signals — some caution, some shortcut habits. Tighten the plan before you count revenue.",
  },
  {
    level: "LOW",
    className: "text-teal-200",
    text: "Human VO, researched scripts, YPP-first thinking, estimates as guesses, multi-month craft. Still no guarantees.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
          Free educational scorecard
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Faceless YouTube will not print $62k because Claude wrote a script.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Viral posts sell &quot;Claude Code + YouTube = passive income.&quot; This quiz scores expectation
          and monetization risk from how you plan to make videos — not your account. It runs in
          your browser. It is not a farm tutorial and not financial advice.
        </p>
      </section>

      <section className="mt-8 max-w-3xl">
        <QuizForm />
      </section>

      <section className="mt-16">
        <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">
          What the labels mean
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {levels.map((item) => (
            <article key={item.level} className="rounded-3xl border border-line bg-panel/60 p-5">
              <h2 className={`font-display text-4xl ${item.className}`}>{item.level}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">How scoring works</h2>
        <ol className="mt-5 grid gap-4 text-sm leading-relaxed text-muted sm:grid-cols-3 sm:text-base">
          <li>
            <span className="block font-mono text-amber">01</span>
            Answer seven questions about visuals, voice, scripts, YPP timing, estimates, timeline,
            and niche.
          </li>
          <li>
            <span className="block font-mono text-amber">02</span>
            Raise weights: AI slideshows, AI main VO, identical templates, money before YPP,
            estimates-as-income, $10k-fast fantasies, empty storytime.
          </li>
          <li>
            <span className="block font-mono text-amber">03</span>
            Lower weights: human VO, researched scripts, YPP-first plans, estimates as guesses,
            format craft over months. Screenshot the card.
          </li>
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          VidIQ and SocialBlade are not AdSense. YouTube can limit inauthentic or mass-produced
          content. A HIGH card is a reality check, not a ban verdict. A LOW card is not a paycheck.
        </p>
      </section>

      <section className="mt-16 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-line bg-panel/50 p-6">
          <h2 className="font-display text-3xl tracking-tight">What this site refuses to sell</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            No Stripe checkout. No &quot;we hit $62k&quot; proof packs. No Japan Invoice upsell. No
            step-by-step farm playbook. If you want sibling tools about ads risk, attention, or AI
            bottlenecks, use the footer links.
          </p>
        </div>
        <SponsorSlot />
      </section>
    </div>
  );
}
