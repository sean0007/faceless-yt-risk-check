import type { Metadata } from "next";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { QuizForm } from "@/components/quiz-form";
import { SponsorSlot } from "@/components/sponsor-slot";
import { RATE_LIMIT } from "@/lib/agent-api";
import { DISCLAIMER_SHORT, HONESTY, PUBLIC_URL, SITE_NAME } from "@/lib/site";

const title = "Do faceless AI YouTube channels get demonetized? Free reality-check quiz";
const description =
  "Free quiz that reality-checks faceless and AI YouTube channel plans. Answer seven questions about visuals, voice, scripts, YPP timing, estimates, timeline, and niche. Get a HIGH / MED / LOW expectation and monetization-risk card. No login.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: `${PUBLIC_URL}/` },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${PUBLIC_URL}/`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: `${PUBLIC_URL}/`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
};

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

const apiExample = `${PUBLIC_URL}/api/score?visual=ai_slideshow&voiceover=ai_voice&scripts=identical_template&revenueTiming=before_ypp&estimates=as_income&timeline=ten_k_fast&niche=broad_storytime`;

const faq: FaqItem[] = [
  {
    q: "Do faceless AI YouTube channels make money?",
    a: "Sometimes channels earn AdSense after YouTube Partner Program, but viral posts that promise Claude Code + YouTube as passive income (or $10k/mo in weeks) are the fantasy this quiz pushes against. A LOW card still does not guarantee views, revenue, or Partner Program approval. VidIQ and SocialBlade estimates are not AdSense deposits.",
  },
  {
    q: "Do faceless AI YouTube channels get demonetized?",
    a: "YouTube can limit or remove inauthentic, repetitive, or mass-produced content. This free quiz scores expectation and monetization-policy risk from how you plan to make videos — not your account. A HIGH card is a reality check, not a ban verdict. It is a heuristic scorecard only, not a prediction of what YouTube will do to any channel.",
  },
  {
    q: "What does this free reality-check quiz do?",
    a: "Answer seven questions about visuals, voiceover, scripts, when you expect money relative to YPP, how you treat VidIQ/SocialBlade estimates, your income timeline, and niche. You get a HIGH / MED / LOW card with the signals that raised or lowered risk and the myths to drop. It runs in your browser. No login. Not a farm tutorial.",
  },
  {
    q: "What do HIGH, MED, and LOW mean?",
    a: "HIGH: patterns viral posts sell as a shortcut — AI slideshows, AI main VO, identical templates, money before YPP, estimates-as-income, or $10k-fast timelines. MED: mixed craft and shortcut signals; tighten the plan before counting revenue. LOW: human VO, researched scripts, YPP-first thinking, estimates as guesses, multi-month craft — still no guarantees. Net score weight 10+ is HIGH, 4–9 is MED, under 4 is LOW.",
  },
  {
    q: "How does the scoring work?",
    a: "Each answer adds or subtracts a weight. Raise weights include AI slideshows (4), AI main VO (3), identical templates (4), money before YPP (4), estimates as income (4), $10k-fast timelines (5), and broad empty storytime (3). Lower weights include original filmed visuals, human VO, researched scripts, YPP-first or not-counting-yet plans, estimates as guesses, multi-month craft, and a researched niche angle. The net score (clamped at 0) maps to HIGH / MED / LOW.",
  },
  {
    q: "Is this a YouTube ban prediction or farm tutorial?",
    a: `No. ${DISCLAIMER_SHORT} ${HONESTY} A HIGH card is educational pushback on shortcut plans, not a verdict that your channel will be banned. The site refuses Stripe checkouts, "$62k" proof packs, and step-by-step farm playbooks.`,
  },
  {
    q: "What happens to my quiz answers?",
    a: "Nothing is stored. The quiz runs in your browser. There is no login, no database, and no tracking of your answers. Screenshot the card if you want to keep it.",
  },
  {
    q: "Is there an API to score a faceless YouTube plan?",
    a: `Yes, free and keyless, with CORS open. GET ${apiExample} or POST ${PUBLIC_URL}/api/score with the same fields as JSON. It returns HIGH / MED / LOW, signals, myths, a plain-text summary, and a disclaimer field. Fair use is about ${RATE_LIMIT} requests per minute per IP. OpenAPI: ${PUBLIC_URL}/openapi.json.`,
  },
  {
    q: "Can my AI assistant run this check through MCP?",
    a: "Yes. The tool faceless_youtube_reality_check is on the free remote MCP server at https://free-agent-tools.vercel.app/mcp (streamable HTTP, no auth), together with the maker's other free tools. Add that URL to Claude, Cursor, ChatGPT, or another MCP client.",
  },
  {
    q: "Are VidIQ or SocialBlade numbers real AdSense income?",
    a: "No. Those tools publish estimates. They are not your AdSense balance. Treating them as income is one of the HIGH-risk signals in this quiz. Revenue counting before YouTube Partner Program (roughly 1,000 subs + 4,000 watch hours, or the Shorts path) is another.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
          Free educational scorecard
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Do faceless AI YouTube channels get demonetized?
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

      <FaqSection items={faq} heading="Faceless YouTube questions" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
