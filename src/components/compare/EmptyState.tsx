export default function EmptyState() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-display font-black text-display-md text-ink">
          No schools yet.
        </h2>
        <p className="mt-4 text-stone-warm leading-relaxed">
          Search above to add schools to your comparison.
          You can compare up to 10 at a time.
        </p>
      </div>
    </section>
  );
}
