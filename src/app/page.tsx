import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero - asymmetric, editorial */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid grid-cols-12 gap-4 px-6 md:px-12">
          {/* Main headline - spans most of grid, left-aligned */}
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <h1 className="font-display font-black text-display-xl text-ink">
              College costs are<br />
              <span className="text-rust">deliberately opaque.</span>
            </h1>
          </div>

          {/* Subtext - offset, narrower column */}
          <div className="col-span-12 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2 mt-8 md:mt-12">
            <p className="text-lg md:text-xl text-stone-warm leading-relaxed">
              Sticker price means nothing. We show you what families in your income bracket
              actually paid — pulled directly from federal data.
            </p>
          </div>

          {/* CTA - not centered, sits in the grid */}
          <div className="col-span-12 md:col-span-6 md:col-start-2 mt-10">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 font-medium hover:bg-rust transition-colors duration-300"
              >
                <span>Start My Profile</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/compare"
                className="text-rust hover:text-rust-dark transition-colors font-medium"
              >
                Quick Compare &rarr;
              </Link>
            </div>
            <p className="mt-4 text-sm text-stone-warm">
              1,983 schools. Personalized to your family&apos;s situation.
            </p>
          </div>
        </div>
      </section>

      {/* Data strip - full bleed, high contrast */}
      <section className="bg-ink text-cream py-12 md:py-16">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="font-display font-thin text-display-lg text-rust-light">1,983</div>
              <div className="text-sm text-stone-warm mt-1">colleges</div>
            </div>
            <div>
              <div className="font-display font-thin text-display-lg text-rust-light">5</div>
              <div className="text-sm text-stone-warm mt-1">income brackets</div>
            </div>
            <div>
              <div className="font-display font-thin text-display-lg text-rust-light">2024</div>
              <div className="text-sm text-stone-warm mt-1">data year</div>
            </div>
            <div>
              <div className="font-display font-thin text-display-lg text-rust-light">$0</div>
              <div className="text-sm text-stone-warm mt-1">cost to you</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - editorial layout, not cards */}
      <section className="py-20 md:py-32">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {/* Section header - tight to left edge */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <h2 className="font-display font-black text-display-md text-ink sticky top-24">
                How it<br />works
              </h2>
            </div>

            {/* Steps - stacked, not in cards */}
            <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-16">
              <div className="border-t-2 border-ink pt-6">
                <span className="font-display font-thin text-4xl text-rust">01</span>
                <h3 className="font-display font-black text-xl mt-4 mb-3">Pick your bracket</h3>
                <p className="text-stone-warm leading-relaxed max-w-md">
                  Select your household income. Federal data breaks costs down by five brackets,
                  from under $30k to over $110k.
                </p>
              </div>

              <div className="border-t-2 border-ink pt-6">
                <span className="font-display font-thin text-4xl text-rust">02</span>
                <h3 className="font-display font-black text-xl mt-4 mb-3">Add schools</h3>
                <p className="text-stone-warm leading-relaxed max-w-md">
                  Search by name. Add up to ten. We pull net price, graduation rate,
                  and median debt for each.
                </p>
              </div>

              <div className="border-t-2 border-ink pt-6">
                <span className="font-display font-thin text-4xl text-rust">03</span>
                <h3 className="font-display font-black text-xl mt-4 mb-3">Compare</h3>
                <p className="text-stone-warm leading-relaxed max-w-md">
                  See real costs side-by-side. No marketing spin.
                  Just what families like yours actually paid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The problem - editorial callout */}
      <section className="bg-stone-light py-20 md:py-28">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <blockquote className="font-display font-black text-display-md text-ink">
                &ldquo;The average family overestimates college costs by
                <span className="text-rust"> $10,000 per year</span>.&rdquo;
              </blockquote>
              <p className="mt-6 text-stone-warm">
                — Sallie Mae, &ldquo;How America Pays for College&rdquo; 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - minimal, confident */}
      <section className="py-24 md:py-32">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-8 lg:col-span-6">
              <h2 className="font-display font-black text-display-lg text-ink mb-8">
                Stop guessing.
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-3 bg-rust text-cream px-8 py-4 font-medium hover:bg-rust-dark transition-colors duration-300"
                >
                  <span>Get My Estimate</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/compare"
                  className="text-ink hover:text-rust transition-colors font-medium"
                >
                  Quick Compare &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
