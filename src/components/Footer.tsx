export default function Footer() {
  return (
    <footer className="border-t border-stone-light py-8">
      <div className="px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-stone-warm">
          Data: U.S. Department of Education College Scorecard
        </p>
        <p className="text-sm text-stone-warm">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
