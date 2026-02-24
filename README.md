# CollegePriceCheck

**See what families like yours actually pay at any college - based on real data, not guesses.**

## The Problem

Families face a $200K+ decision based on sticker prices that nobody pays. Net price calculators are confusing, one-school-at-a-time, and the real costs don't arrive until April - too late to plan properly.

## The Solution

CollegePriceCheck shows you what families in your income bracket actually paid at each school on your list. Side-by-side comparison. Real historical data from the College Scorecard. No guessing.

## Features (MVP)

- [ ] Compare 10+ schools side-by-side
- [ ] Net price by income bracket (5 brackets)
- [ ] Median debt at graduation
- [ ] 4-year graduation rates
- [ ] Debt "traffic light" (green/yellow/red)
- [ ] Simple PDF export

## Data

- **Source:** U.S. Department of Education College Scorecard API
- **Coverage:** 1,983 four-year colleges
- **Completeness:** 85% net price data, 90% debt data, 88% completion rates

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deployment)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
CollegePriceCheck/
├── data/               # College Scorecard data (1,983 schools)
├── docs/               # Specs and documentation
├── scripts/            # Data fetching scripts
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   └── lib/           # Utilities and data access
└── public/            # Static assets
```

## License

MIT
