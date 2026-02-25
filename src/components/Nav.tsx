import Link from 'next/link';

interface NavProps {
  rightContent?: React.ReactNode;
}

export default function Nav({ rightContent }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-stone-light">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link href="/" className="font-display font-black text-xl tracking-tight">
          CPC
        </Link>
        {rightContent ?? (
          <Link
            href="/compare"
            className="text-sm font-medium text-rust hover:text-rust-dark transition-colors link-underline"
          >
            Compare Now
          </Link>
        )}
      </div>
    </nav>
  );
}
