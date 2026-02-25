'use client';

import { School, IncomeBracket } from '@/lib/types';
import { INCOME_BRACKETS } from '@/lib/constants';
import { formatCurrency, getNetPrice } from '@/lib/formatters';

interface BracketBreakdownProps {
  school: School;
  selectedBracket: IncomeBracket;
}

export default function BracketBreakdown({ school, selectedBracket }: BracketBreakdownProps) {
  const prices = INCOME_BRACKETS.map((bracket) => ({
    bracket,
    price: getNetPrice(school, bracket),
    isSelected: bracket.id === selectedBracket.id,
  }));

  const maxPrice = Math.max(...prices.map((p) => p.price ?? 0), 1);

  return (
    <div>
      <h4 className="font-display font-black text-sm text-ink mb-4">
        Net Price by Income Bracket
      </h4>
      <div className="space-y-3">
        {prices.map(({ bracket, price, isSelected }) => (
          <div
            key={bracket.id}
            className={`flex items-center gap-3 py-2 px-3 ${
              isSelected ? 'bg-rust/10 border-l-2 border-rust' : 'border-l-2 border-transparent'
            }`}
          >
            <div className="w-28 flex-shrink-0 text-xs text-stone-warm">
              {bracket.label}
            </div>
            <div className="flex-1 flex items-center gap-3">
              {price !== null ? (
                <>
                  <div className="flex-1 bg-stone-light/50 h-5 relative">
                    <div
                      className={`h-full ${isSelected ? 'bg-rust' : 'bg-ink/20'}`}
                      style={{ width: `${(price / maxPrice) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-display font-black flex-shrink-0 w-20 text-right ${
                    isSelected ? 'text-rust' : 'text-ink'
                  }`}>
                    {formatCurrency(price)}
                  </span>
                </>
              ) : (
                <span className="text-sm italic text-stone-warm">Not reported</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
