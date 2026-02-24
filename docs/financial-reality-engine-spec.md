# Financial Reality Engine - Deep Dive Spec
*Revised Feb 24, 2026 - Refocused on Cost Transparency*
*Updated: Data Audit Complete, Asset Handling Added*

## The Core Problem

Families face a $200K+ decision based on sticker prices that nobody pays. The real cost is buried behind:
- Confusing net price calculators (30+ questions, one school at a time)
- Opaque aid packages that arrive in April (too late)
- No way to compare apples-to-apples across schools
- Marketing language that obscures what families actually pay

**The anxiety isn't "will my kid earn enough?" - it's "what will this actually cost us?"**

---

## What We CAN vs CAN'T Predict

### Knowable (High Confidence)
| Data Point | Source | Why It's Reliable |
|------------|--------|-------------------|
| Sticker price | School websites | Published, required by law |
| Net price by income bracket | IPEDS/College Scorecard | What families ACTUALLY paid |
| % of need met | School data | Historical pattern |
| Median debt at graduation | College Scorecard | Real outcomes |
| 4-year vs 6-year completion rates | IPEDS | Affects true total cost |
| Merit scholarship ranges | School data | Published award bands |
| In-state vs out-of-state tuition | School websites | Fixed for publics |

### Unknowable (Don't Promise)
| Data Point | Why It's Unreliable |
|------------|---------------------|
| Your exact scholarship/grant | Depends on admission decision, school budget |
| Future salary by major | World changing too fast, backward-looking data |
| External scholarship wins | Unpredictable |
| Merit aid at reach schools | If you're a reach, merit is unlikely |

**Our principle: Show what we KNOW, not what we guess.**

---

## Data Audit Results (Feb 24, 2026)

### College Scorecard API - Data Quality Assessment

**Overall: GOOD - Ready to Build ✅**

| Metric | Result | Notes |
|--------|--------|-------|
| Schools with income-bracket net price | 89-94% | Public OR private data available |
| Schools with median debt | 93-94% | Very complete |
| Schools with completion rate | 90%+ | Solid coverage |
| Total 4-year schools in database | 1,983 | Comprehensive |

### Schools With Missing Data (6-10%)

These are NOT schools families typically compare:
- Tiny religious schools (Heritage Christian, Selma University)
- Specialty/medical schools (US Sports University)
- Upper-division only institutions (Athens State)

**Major schools families care about have complete data.**

### Sample Data - NC Schools (Validated)

| School | Low Income ($0-30K) | Mid Income ($48-75K) | High Income ($110K+) | Median Debt | 4-Yr Grad Rate |
|--------|---------------------|----------------------|----------------------|-------------|----------------|
| **Duke** | $3,295 | $6,901 | $54,375 | $13,000 | 96% |
| **UNC Chapel Hill** | $3,165 | $11,220 | $24,077 | $14,000 | 92% |
| **NC State** | $6,200 | $13,992 | $24,211 | $20,121 | 85% |
| **Davidson** | $6,613 | $7,610 | $40,503 | $18,688 | 92% |
| **Elon** | $27,108 | $32,133 | $48,382 | $20,500 | 83% |
| **App State** | $8,370 | $15,766 | $21,991 | $20,231 | 74% |

**Verdict:** Data is solid. Concern about "20% N/A" was overcautious - actual gap is 6-10% and only affects schools nobody's comparing.

---

## Handling Assets, Savings, and 529s

### The Challenge

Income bracket averages hide variance from:
- Home equity (matters for CSS Profile schools, ~400 schools)
- Savings/investments outside retirement
- 529 balances
- Multiple children in college

A family earning $90K with $500K home equity gets a different package than one with zero assets.

### Our Approach: Honest Ranges + Optional Refinement

**Default View (Simple):**
- Show range, not single number: "Families in your bracket paid **$18K - $34K**"
- Include note: "Where you fall depends on assets and family situation"

**Optional Refinement (For Users Who Want It):**

Add 2-3 optional questions:
1. "Do you have significant savings/investments outside retirement?" (Yes/No/Prefer not to say)
2. "Do you have home equity over $100K?" (Yes/No) - Only matters for CSS Profile schools
3. "Do you have a 529? Approximate balance?" (Optional)

**If assets are significant:**
- Show message: "Your net price may be **higher** than the bracket average"
- For CSS Profile schools, flag: "This school considers home equity"

**529 Handling:**
- 529s don't reduce total cost - they shift WHO pays (your savings vs grants)
- Show: "Your $50K 529 will offset aid - total cost similar, but paid from your savings"

### Copy Principles

**Don't say:** "Families like yours paid $24,000"
**Do say:** "Families in your income range paid between $18K - $32K. Assets and family size affect where you fall."

Under-promise, over-deliver. Build trust through honesty.

---

## Competitive Landscape

### Direct Competitors

#### 1. MyinTuition (myintuition.org)
**What they do:** Quick 3-minute cost estimator using 6 questions.

**Strengths:**
- Fast, simple (6 questions vs 30+ on school NPCs)
- Used by 70+ elite schools (Dartmouth, Cornell, Amherst, etc.)
- "Instant Net Price Estimator" launched Oct 2025

**Weaknesses:**
- Only works for partner schools (mostly elite privates)
- No comparison across schools - one school at a time
- Doesn't cover most schools families consider

**Gap:** They don't cover most schools, no comparison view.

---

#### 2. CollegeVine (collegevine.com)
**What they do:** Free financial aid calculator + admission chancing engine.

**Strengths:**
- Free
- Combines chancing with financial aid
- Good UX, popular with students

**Weaknesses:**
- Financial estimates are basic
- Chancing is the focus, not financial planning
- Parents aren't the primary user

**Gap:** Optimized for "can I get in?" not "what will it cost?"

---

#### 3. Niche (niche.com)
**What they do:** College rankings including "Best Value."

**Strengths:**
- Comprehensive data
- Good comparison tool (up to 4 schools)
- Free

**Weaknesses:**
- Rankings are generic, not personalized to YOUR income
- Information-dense but not actionable
- No "what will MY family pay" view

**Gap:** Generic data, not personalized to family situation.

---

#### 4. Edmit (edmit.me)
**What they do:** College financial planning platform. $99/year with advisor calls.

**Strengths:**
- Founded by former university leaders
- Raised $2.3M seed (2018)
- Human advisor component

**Weaknesses:**
- Site appears struggling (Cloudflare errors)
- May have pivoted or wound down

**Gap:** If they're fading, there's a vacuum. Model validates willingness to pay.

---

#### 5. TuitionTracker (Hechinger Report)
**What they do:** Shows what families at different income brackets ACTUALLY paid.

**Strengths:**
- Real data (not estimates)
- Income bracket comparison
- Free, journalism-backed

**Weaknesses:**
- No comparison across multiple schools at once
- Basic UX, not built for parents planning

**Gap:** Right data, wrong UX. We can do this better.

---

### What Nobody Does Well

1. **Unified comparison** - Enter income ONCE, see net price across ALL schools on your list
2. **Income-bracket transparency** - "Families earning $80-100K paid $X at this school"
3. **Debt reality check** - "Here's the median debt, here's your monthly payment"
4. **Side-by-side clarity** - 10 schools, apples-to-apples, your income bracket
5. **Parent-first UX** - Parents are making the decision, but tools target students

---

## Proposed Solution: Financial Reality Engine

### Core Value Proposition

*"See what families like yours actually pay at each school on your list - based on real data, not guesses."*

### What It Is NOT
- Not a salary predictor
- Not a "is college worth it" ROI calculator
- Not a scholarship finder
- Not a FAFSA replacement

### What It IS
- A cost transparency tool
- A comparison simplifier
- A debt reality check
- A planning aid for the $200K decision

---

## Core Features

### 1. Simple Financial Profile
**Input (one time):**
- Household income range (brackets, not exact)
- Home state
- Family size / # in college
- Schools on your list (or search to add)

**Optional refinement:**
- Significant assets outside retirement? (Yes/No)
- Home equity over $100K? (Yes/No)
- 529 balance (approximate)

**Not asking:**
- Detailed asset breakdown
- Tax returns
- 30 questions about home equity

---

### 2. Cost Comparison Dashboard

For each school on their list, show:

| School | Sticker Price | Your Bracket Range | Median Debt | 4-Year Grad Rate |
|--------|---------------|-------------------|-------------|------------------|
| Duke | $82,000 | $16K - $28K | $13,000 | 96% |
| UNC (in-state) | $26,000 | $11K - $18K | $14,000 | 92% |
| NC State | $28,000 | $12K - $20K | $20,121 | 85% |

**Key insight:** One glance shows the real cost landscape with honest ranges.

---

### 3. Net Price by Income Bracket

For each school, show the IPEDS data:

| Income Bracket | Average Net Price | Typical Range |
|----------------|-------------------|---------------|
| $0 - $30K | $3,295 | $0 - $8K |
| $30K - $48K | $6,500 | $2K - $12K |
| $48K - $75K | $11,220 | $6K - $18K |
| $75K - $110K | $18,500 | $12K - $28K |
| $110K+ | $24,077 | $18K - $35K |

**Highlight their bracket.** Show range, not false precision.

---

### 4. Debt Reality Check

For each school:
- **Median debt at graduation:** $14,000
- **Monthly payment (10-year standard):** $147/month
- **Monthly payment (income-driven):** ~$100/month

Visual "traffic light":
- 🟢 Debt < $30K (manageable for most grads)
- 🟡 Debt $30-50K (stretch for some fields)
- 🔴 Debt > $50K (high burden)

---

### 5. School Cost Patterns

Flag useful patterns (manually curated for top 50 schools initially):
- ✅ "Meets 100% of demonstrated need"
- ✅ "No-loan policy for families under $X"
- ⚠️ "Known for gapping (aid doesn't cover full need)"
- ⚠️ "Uses CSS Profile - considers home equity"
- 📊 "Merit scholarships available: $5K-$20K for top 25% of admits"

---

### 6. Total Cost Projection

Simple 4-year view:

| School | Year 1 | Year 2 | Year 3 | Year 4 | **Total Range** |
|--------|--------|--------|--------|--------|-----------------|
| Duke | $16-28K | $17-29K | $18-31K | $19-32K | **$70K - $120K** |
| UNC | $11-18K | $12-19K | $12-20K | $13-21K | **$48K - $78K** |

*Assumes ~5% annual increase (historical average). Range reflects asset variation.*

---

## Technical Approach

### Data Sources (All Free/Public)

1. **College Scorecard API** ✅ Validated
   - Net price by income bracket
   - Median debt
   - Completion rates
   - School characteristics

2. **IPEDS**
   - Detailed financial aid data
   - Enrollment statistics
   - Published net prices

3. **Manual curation (Phase 2)**
   - Merit scholarship ranges for top 50 schools
   - Special policies (no-loan, meets full need)
   - CSS Profile flags

**No web scraping in MVP** - too much maintenance burden.

### MVP Scope

**Phase 1 (2 weeks):**
- 200 schools (top privates + flagship publics)
- Income bracket net price display with ranges
- Side-by-side comparison (up to 10 schools)
- Basic debt reality check
- Simple asset refinement questions

**Phase 2 (4 weeks):**
- 1,000+ schools
- School pattern flags (meets need, gapping, etc.) - manually curated
- 4-year cost projection with ranges
- PDF export for family discussions

**Phase 3 (future):**
- All 4,000+ schools
- "Schools like this" recommendations
- Save and share lists

---

## Business Model

### B2C Direct (Primary Strategy)

**Freemium:**
- **Free:** Basic comparison view, see all schools, sticker price + one data point
- **$29 one-time:** Full income-bracket breakdown, debt projections, 4-year view, PDF exports

**Why B2C over B2B:**
- Parents have the wallet AND the urgency
- $29 is impulse buy for $200K decision
- Faster feedback loop - learn what users need quickly
- Build brand that B2B buyers want access to later
- JP's strength is direct relationship selling, not enterprise sales cycles

**B2B can come later:** Once 10,000 parents love the tool, schools/counselors will ask for bulk access. Better negotiating position.

### Why Parents Will Pay
- $29 is nothing compared to $200K decision
- Reduces anxiety with real data
- Replaces hours of confusing research
- Gives families a shared planning tool

---

## Validation Plan

### Option 1: Quick Landing Page (Fastest)
- Simple page: "See what families like yours actually pay at any college"
- Email capture for early access
- Share in parent Facebook groups, Reddit r/ApplyingToCollege
- Goal: 100 signups = signal of demand

### Option 2: Parent Interviews (Deepest)
Interview 5-10 parents of juniors/seniors:
- "How do you currently compare college costs?"
- "What's most confusing about financial aid?"
- "Would you pay $29 for a clear cost comparison tool?"

### Option 3: Prototype Test (Middle Ground)
- Build Figma clickable prototype (2-3 days)
- Show to 5 parents including Elodie's situation
- Test: Do they understand it? Does it reduce anxiety? Would they pay?

**Recommendation:** Start with Option 1 (landing page) while doing 3-5 parent interviews in parallel.

---

## Differentiation Summary

| Feature | MyinTuition | CollegeVine | Niche | TuitionTracker | **Us** |
|---------|-------------|-------------|-------|----------------|--------|
| Personalized to income | ✓ (limited) | Basic | ✗ | ✓ | ✓ |
| Shows ranges (honest) | ✗ | ✗ | ✗ | ✗ | **✓** |
| Multi-school compare | ✗ | Limited | 4 max | ✗ | **10+** |
| Covers most schools | ✗ | ✓ | ✓ | ✓ | ✓ |
| Debt reality check | ✗ | ✗ | ✗ | ✗ | **✓** |
| Parent-focused UX | ✗ | ✗ | ✗ | ✗ | **✓** |
| Asset considerations | ✗ | ✗ | ✗ | ✗ | **✓** |

---

## Why This Framing Works

**We're NOT saying:** "Families like yours paid exactly $24,000"

**We ARE saying:** "Families in your income range paid between $18K - $32K at Duke. Students graduated with $13K median debt - that's $137/month. Here's how that compares to your other options."

**The value:**
- Real data, not projections
- Honest ranges, not false precision
- Transparency, not predictions
- Clarity for the decision they're actually making

---

## Next Steps

1. ✅ **Data audit** - Complete. Data quality is solid.
2. 🔲 **Validate demand** - Landing page + 5 parent interviews this week
3. 🔲 **Design comparison view** - What does the dashboard look like?
4. 🔲 **Build MVP** - 2-week sprint
5. 🔲 **Test with real families** - Including with Elodie's college list

---

## Open Questions

1. **Pricing:** $29 one-time vs $9/month vs $49/year?
2. **Free tier limits:** Gate by # of schools or by features (debt projection, PDF)?
3. **Name:** "Financial Reality Engine" is internal - what's the user-facing name?
4. **Integration:** Standalone tool or feature inside existing College Planning app?
