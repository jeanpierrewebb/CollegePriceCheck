import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-700">
            CollegePriceCheck
          </div>
          <Link
            href="/compare"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start Comparing
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          See what college{" "}
          <span className="text-primary-600">really costs</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Stop guessing. See what families like yours actually paid at any
          college - based on real data from the U.S. Department of Education.
        </p>
        <Link
          href="/compare"
          className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Compare Colleges Free
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          1,983 colleges - No signup required
        </p>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Select your income</h3>
            <p className="text-gray-600">
              Choose your household income bracket. We show what families like
              yours paid.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Add colleges</h3>
            <p className="text-gray-600">
              Search and add schools to your comparison list. Compare up to 10
              at once.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">See real costs</h3>
            <p className="text-gray-600">
              View actual net prices, median debt, and graduation rates
              side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary-600">1,983</div>
              <div className="text-gray-600">Colleges covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">5</div>
              <div className="text-gray-600">Income brackets</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">$0</div>
              <div className="text-gray-600">To use</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to see the real numbers?
        </h2>
        <p className="text-gray-600 mb-8">
          Compare colleges in under 2 minutes. No signup required.
        </p>
        <Link
          href="/compare"
          className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Start Comparing
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Data source: U.S. Department of Education College Scorecard
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} CollegePriceCheck
          </p>
        </div>
      </footer>
    </main>
  );
}
