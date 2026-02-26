'use client';

import { useState, useEffect } from 'react';
import { calculateSAI, formatSAI, SAIResult } from '@/lib/saiCalculator';
import { FamilyProfile, DEFAULT_PROFILE } from '@/lib/types';

export default function SAIDisplay() {
  const [saiResult, setSaiResult] = useState<SAIResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('collegepricecheck_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const profile: FamilyProfile = { ...DEFAULT_PROFILE, ...parsed.profile || parsed };
        
        // Only calculate if we have some financial data
        if (profile.householdIncome) {
          const result = calculateSAI(profile);
          setSaiResult(result);
        }
      }
    } catch (e) {
      console.error('Failed to calculate SAI:', e);
    }
  }, []);

  if (!saiResult) {
    return null;
  }

  const needLevelColors = {
    high: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-orange-50 border-orange-200',
    none: 'bg-stone-light border-stone-warm/30',
  };

  const needLevelText = {
    high: 'High need-based aid eligibility',
    medium: 'Moderate need-based aid eligibility',
    low: 'Limited need-based aid eligibility',
    none: 'Focus on merit aid',
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${needLevelColors[saiResult.needLevel]}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-stone-warm mb-1">
            Estimated Student Aid Index (SAI)
          </div>
          <div className="font-display font-black text-2xl text-ink">
            {formatSAI(saiResult.estimatedSAI)}
          </div>
          <div className="text-sm font-medium text-rust mt-1">
            {needLevelText[saiResult.needLevel]}
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-stone-warm hover:text-ink transition-colors text-sm"
        >
          {isExpanded ? 'Less' : 'More'} info
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-light space-y-3">
          <p className="text-sm text-ink">
            {saiResult.explanation}
          </p>
          <p className="text-xs text-stone-warm italic">
            {saiResult.disclaimer}
          </p>
          <a
            href="/onboarding"
            className="inline-block text-sm text-rust hover:text-rust-dark transition-colors"
          >
            Update your financial info →
          </a>
        </div>
      )}
    </div>
  );
}
