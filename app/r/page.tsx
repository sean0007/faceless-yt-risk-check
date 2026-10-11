import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResultCard } from "@/components/result-card";
import {
  PUBLIC_URL,
  driverLabels,
  isExample,
  ogPath,
  parseResultParams,
  resultFromInputs,
  resultHeadline,
  resultPath,
} from "@/lib/share";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

type SP = Promise<Record<string, string | string[] | undefined>>;

const levelClass = { HIGH: "text-rose-300", MED: "text-amber", LOW: "text-teal-200" } as const;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const answers = parseResultParams(await searchParams);
  if (!answers) return { title: "Your result", robots: { index: false, follow: true } };
  const r = resultFromInputs(answers);
  const title = resultHeadline(answers, r);
  const description = `${r.title}. ${driverLabels(answers, r.level).join(", ")}. Score weight ${r.score}. Shared from the free Faceless YT Reality Check quiz. ${DISCLAIMER_SHORT}`;
  const url = `${PUBLIC_URL}${resultPath(answers)}`;
  const image = ogPath(answers);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: isExample(answers) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `Faceless YT Reality Check · ${title}`,
      description,
      type: "website",
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `Faceless YT Reality Check · ${title}`, description, images: [image] },
  };
}

export default async function ResultPage({ searchParams }: { searchParams: SP }) {
  const answers = parseResultParams(await searchParams);
  if (!answers) redirect("/");
  const r = resultFromInputs(answers);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Shared result · Faceless YT Reality Check</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          <span className={levelClass[r.level]}>{r.level} risk</span> faceless YouTube plan
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {r.level === "LOW" ? "What lowered it" : "What drove it"}: {driverLabels(answers, r.level).join(", ")}.
        </p>
        <p className="mt-3 text-sm text-muted">
          This card was rebuilt from the seven quiz answers in the link. Nothing else is in the link and nothing was stored.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/" className="text-amber underline underline-offset-2">
            Take the quiz for your own channel plan →
          </Link>
        </p>
      </section>
      <section className="max-w-3xl">
        <ResultCard result={r} answers={answers} shared />
      </section>
      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
        {DISCLAIMER_SHORT} {HONESTY}
      </p>
    </div>
  );
}
