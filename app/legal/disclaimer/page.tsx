import type { Metadata } from "next";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: DISCLAIMER_SHORT,
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Read this</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
        Disclaimer
      </h1>
      <p className="mt-4 text-lg text-foreground">{DISCLAIMER_SHORT}</p>
      <p className="mt-2 text-muted">{HONESTY}</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-base font-semibold text-foreground">What this is</h2>
          <p className="mt-2">
            Faceless YT Reality Check is a free educational scorecard. You answer seven questions
            about how you plan to make YouTube videos. A fixed heuristic in your browser labels
            expectation and monetization risk HIGH, MED, or LOW. It does not look up a YouTube
            channel, AdSense account, or third-party analytics profile.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">What this is not</h2>
          <p className="mt-2">
            This is not financial advice, not legal advice, not a YouTube or Google partner, and
            not a faceless-channel farm tutorial. We do not sell earnings, courses, or reinstatement.
            No payment on this site buys revenue, views, or Partner Program approval. Japan Invoice
            and similar products are not promoted here.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Estimates and policy</h2>
          <p className="mt-2">
            VidIQ, SocialBlade, and similar tools publish estimates. Those numbers are not AdSense
            deposits. YouTube publishes rules about spam, deceptive practices, and inauthentic or
            mass-produced content. This card can mention that risk in plain language. It cannot
            predict enforcement against any channel.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">The score can be wrong</h2>
          <p className="mt-2">
            The label follows the answers you pick. It is a teaching device aimed at viral
            &quot;Claude Code + YouTube = $62k/mo&quot; claims. It misses nuance. Trust official YouTube
            Partner Program requirements and your own analytics over this page.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Your data</h2>
          <p className="mt-2">
            Quiz answers stay in the browser for scoring. There is no login and no database on
            this version. Do not paste passwords or payment details into any field.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Sponsorship</h2>
          <p className="mt-2">
            The dashed &quot;your ad here&quot; box is an empty slot. It does not load an ad network.
          </p>
        </section>
      </div>
    </div>
  );
}
