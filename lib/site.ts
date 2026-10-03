export const SITE_NAME = "Faceless YT Reality Check";

export const SITE_TAGLINE =
  "A short quiz that pushes back on viral Claude Code + YouTube income claims.";

export const DISCLAIMER_SHORT =
  "Not financial or legal advice. Educational only. Not a YouTube farm tutorial.";

export const HONESTY =
  "Heuristic scorecard only. VidIQ and SocialBlade estimates are not AdSense. YouTube may limit inauthentic or mass-produced content.";

export const SIBLING_TOOLS = [
  { href: "https://fund-fix-flee.vercel.app", label: "Founder Scorecard" },
  { href: "https://japan-trip-brain.vercel.app", label: "Japan Trip Brain" },
  { href: "https://hotel-ota-calculator.vercel.app", label: "Hotel OTA Calculator" },
  { href: "https://saas-bill-cutter.vercel.app", label: "SaaS Bill Cutter" },
  { href: "https://ads-risk-check.vercel.app", label: "Ads Risk Check" },
  { href: "https://appgate-pack.vercel.app/check", label: "AppGate Pack" },
  { href: "https://ai-bottleneck-map.vercel.app", label: "AI Bottleneck Map" },
  { href: "https://viral-attention-map.vercel.app", label: "Viral Attention Map" },
] as const;

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "https://faceless-yt-risk-check.vercel.app";
}
