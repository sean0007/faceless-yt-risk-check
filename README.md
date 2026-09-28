# Faceless YT Reality Check

Free educational scorecard. Answer a short quiz about how you plan to make faceless YouTube videos and get a **HIGH / MED / LOW** expectation + monetization risk card.

Built to push back on viral “Claude Code + YouTube = $62k/mo” claims. It is **not** financial or legal advice, **not** a YouTube farm tutorial, and **not** a revenue forecast.

## What it does

- **Home (`/`)**: seven-question quiz → screenshot-friendly risk card with signals and myths to drop. Scoring stays in the browser.
- **Disclaimer**: sticky banner + sticky footer on the result card + `/legal/disclaimer`.
- **Redirect**: `/check` → `/`.

There is no login, no database, no Stripe, and no fake earnings chart.

## Scoring (short version)

**Raises risk:** AI image slideshow / mass paint images; AI main VO; identical template every video; expecting money before YPP; treating VidIQ/SocialBlade as income; $10k+/mo in 1–2 months; broad storytime with no original insight.

**Lowers risk:** human VO; original researched scripts; YPP plan before counting revenue; estimates as guesses; multi-month craft mindset; researched niche angle.

## How to run

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Vercel

Import this GitHub repo into Vercel. Framework preset: **Next.js**. No database required.

Optional:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for metadata |

## Disclaimer

Not affiliated with YouTube or Google. Heuristic only. See `/legal/disclaimer`.
