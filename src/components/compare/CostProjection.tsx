'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatters';
import { projectFourYearCost } from '@/lib/calculations';

interface CostProjectionProps {
  netPrice: number | null;
}

export default function CostProjection({ netPrice }: CostProjectionProps) {
  const [showYears, setShowYears] = useState(false);
  const projection = projectFourYearCost(netPrice);

  if (!projection) {
    return (
      <div>
        <h4 className="font-display font-black text-sm text-ink mb-2">
          4-Year Projected Total
        </h4>
        <p className="text-sm italic text-stone-warm">
          Insufficient data to project.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-display font-black text-sm text-ink mb-2">
        4-Year Projected Total
      </h4>
      <div className="font-display font-black text-display-md text-ink">
        {formatCurrency(projection.total)}
      </div>
      <button
        onClick={() => setShowYears(!showYears)}
        className="mt-2 text-xs text-rust hover:text-rust-dark transition-colors"
      >
        {showYears ? 'Hide' : 'Show'} year-by-year breakdown
      </button>
      {showYears && (
        <div className="mt-3 space-y-1">
          {projection.years.map((amount, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-stone-warm">Year {i + 1}</span>
              <span className="font-display font-black text-ink">{formatCurrency(amount)}</span>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-stone-warm">
        Projected using 5% annual increase based on historical averages.
      </p>
    </div>
  );
}
