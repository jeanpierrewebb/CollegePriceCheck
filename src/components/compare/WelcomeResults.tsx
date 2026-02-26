'use client';

import { useState, useEffect } from 'react';
import { calculateSAI, formatSAI, SAIResult } from '@/lib/saiCalculator';
import { FamilyProfile, DEFAULT_PROFILE } from '@/lib/types';

interface WelcomeResultsProps {
  onSearchFocus: () => void;
}

export default function WelcomeResults({ onSearchFocus }: WelcomeResultsProps) {
  const [saiResult, setSaiResult] = useState<SAIResult | null>(null);
  const [profile, setProfile] = useState<FamilyProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('collegepricecheck_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedProfile: FamilyProfile = { ...DEFAULT_PROFILE, ...parsed.profile || parsed };
        setProfile(loadedProfile);
        
        if (loadedProfile.householdIncome) {
          const result = calculateSAI(loadedProfile);
          setSaiResult(result);
        }
      }
    } catch (e) {
      console.error('Failed to calculate SAI:', e);
    }
  }, []);

  const needLevelColors = {
    high: 'bg-green-50 border-green-300',
    medium: 'bg-yellow-50 border-yellow-300',
    low: 'bg-orange-50 border-orange-300',
    none: 'bg-stone-light border-stone-warm/50',
  };

  const needLevelBadge = {
    high: { text: 'Strong need-based aid candidate', color: 'bg-green-100 text-green-800' },
    medium: { text: 'Moderate need-based aid candidate', color: 'bg-yellow-100 text-yellow-800' },
    low: { text: 'Limited need-based aid eligibility', color: 'bg-orange-100 text-orange-800' },
    none: { text: 'Focus on merit-based aid', color: 'bg-rust/10 text-rust' },
  };

  // Fallback if no profile/SAI
  if (!saiResult) {
    return (
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-black text-display-sm text-ink">
            Let&apos;s find what you&apos;ll actually pay
          </h2>
          <p className="mt-4 text-stone-warm leading-relaxed">
            Search for colleges below to see real cost data for families like yours.
          </p>
          <button
            onClick={onSearchFocus}
            className="mt-6 px-6 py-3 bg-rust text-cream rounded-lg font-semibold hover:bg-rust-dark transition-colors"
          >
            Search for a college
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center gap-2 text-sm text-stone-warm mb-6">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 font-semibold text-xs">✓</span>
          <span>Profile complete</span>
          <span className="mx-2">→</span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rust text-cream font-semibold text-xs">2</span>
          <span className="font-medium text-ink">Add schools to compare</span>
        </div>

        {/* SAI Hero Card */}
        <div className={`rounded-xl border-2 p-6 md:p-8 ${needLevelColors[saiResult.needLevel]}`}>
          <div className="text-sm font-medium text-stone-warm uppercase tracking-wide mb-2">
            Your Estimated Student Aid Index (SAI)
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="font-display font-black text-4xl md:text-5xl text-ink">
                {formatSAI(saiResult.estimatedSAI)}
              </div>
              <div className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${needLevelBadge[saiResult.needLevel].color}`}>
                {needLevelBadge[saiResult.needLevel].text}
              </div>
            </div>
            
            <a
              href="/onboarding"
              className="text-sm text-stone-warm hover:text-rust transition-colors whitespace-nowrap"
            >
              Edit profile →
            </a>
          </div>

          {/* Explanation */}
          <div className="mt-6 pt-6 border-t border-current/10">
            <h3 className="font-semibold text-ink mb-2">What does this mean?</h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              {saiResult.explanation}
            </p>
            <p className="text-xs text-stone-warm mt-3 italic">
              {saiResult.disclaimer}
            </p>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="mt-8 p-6 bg-cream-dark rounded-xl border border-stone-light">
          <h3 className="font-display font-bold text-xl text-ink mb-2">
            Now, add schools to see what you&apos;ll pay
          </h3>
          <p className="text-stone-warm mb-4">
            We&apos;ll show you what families in your income bracket actually paid at each school - 
            not the sticker price. Compare up to 10 schools side by side.
          </p>
          <button
            onClick={onSearchFocus}
            className="px-6 py-3 bg-rust text-cream rounded-lg font-semibold hover:bg-rust-dark transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search for a college
          </button>
          
          <div className="mt-4 text-sm text-stone-warm">
            Try: Stanford, UNC Chapel Hill, NC State, Duke...
          </div>
        </div>

        {/* Quick tips */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-stone-light">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-ink text-sm mb-1">Match vs. Reach</h4>
            <p className="text-xs text-stone-warm">
              We flag schools based on typical admit profiles to help you build a balanced list.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-stone-light">
            <div className="text-2xl mb-2">🏠</div>
            <h4 className="font-semibold text-ink text-sm mb-1">In-State Savings</h4>
            <p className="text-xs text-stone-warm">
              Public schools in your state are automatically flagged with lower costs.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-stone-light">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-semibold text-ink text-sm mb-1">Merit Aid Odds</h4>
            <p className="text-xs text-stone-warm">
              See which schools commonly award merit scholarships regardless of need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
