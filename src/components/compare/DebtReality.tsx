'use client';

import { IncomeBracket } from '@/lib/types';
import { formatCurrency, getDebtColor, getDebtLabel } from '@/lib/formatters';
import { calculateMonthlyPayment, calculateIDR, calculateTotalRepaid } from '@/lib/calculations';

interface DebtRealityProps {
  debt: number | null;
  bracket: IncomeBracket;
}

export default function DebtReality({ debt, bracket }: DebtRealityProps) {
  if (debt === null) {
    return (
      <div>
        <h4 className="font-display font-black text-sm text-ink mb-2">
          Debt Reality Check
        </h4>
        <p className="text-sm italic text-stone-warm">
          No median debt data available.
        </p>
      </div>
    );
  }

  const monthly = calculateMonthlyPayment(debt);
  const idr = calculateIDR(bracket.midpointIncome);
  const totalRepaid = calculateTotalRepaid(monthly);
  const debtColor = getDebtColor(debt);
  const debtLabel = getDebtLabel(debt);

  return (
    <div>
      <h4 className="font-display font-black text-sm text-ink mb-3">
        Debt Reality Check
      </h4>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display font-black text-lg text-ink">
          {formatCurrency(debt)}
        </span>
        <span className={`text-sm font-medium ${debtColor}`}>
          &bull; {debtLabel}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-warm">Standard (10-yr)</span>
          <span className="font-display font-black text-ink">{formatCurrency(monthly)}/mo</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-warm">Income-Driven (est.)</span>
          <span className="font-display font-black text-ink">{formatCurrency(idr)}/mo</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-stone-light">
          <span className="text-stone-warm">Total repaid (standard)</span>
          <span className="font-display font-black text-ink">{formatCurrency(totalRepaid)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-warm">
        Based on 5.5% federal rate. IDR based on bracket midpoint income.
      </p>
    </div>
  );
}
