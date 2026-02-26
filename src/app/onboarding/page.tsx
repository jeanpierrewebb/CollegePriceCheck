'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FamilyProfile,
  INCOME_BRACKETS,
  US_STATES,
  MARITAL_STATUS_OPTIONS,
  CHILDREN_IN_COLLEGE_OPTIONS,
  SAVINGS_OPTIONS,
  HOME_EQUITY_OPTIONS,
  BALANCE_529_OPTIONS,
  SPECIAL_CIRCUMSTANCES,
  CLASS_RANK_OPTIONS,
  INTENDED_MAJOR_OPTIONS,
  DEFAULT_PROFILE,
} from '@/lib/types';

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<FamilyProfile>(DEFAULT_PROFILE);

  const updateProfile = (field: keyof FamilyProfile, value: string | number | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialCircumstance = (id: string) => {
    const current = profile.specialCircumstances || [];
    const updated = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    updateProfile('specialCircumstances', updated);
  };

  const handleContinue = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - save to localStorage and redirect
      localStorage.setItem('collegepricecheck_profile', JSON.stringify(profile));
      router.push('/compare');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Go directly to compare with defaults
    localStorage.setItem('collegepricecheck_profile', JSON.stringify(DEFAULT_PROFILE));
    router.push('/compare');
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-stone-light">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link href="/" className="font-display font-black text-xl tracking-tight">
            CPC
          </Link>
          <button
            onClick={handleSkip}
            className="text-sm text-stone-warm hover:text-ink transition-colors"
          >
            Skip for now
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-stone-warm">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm text-stone-warm">
                {currentStep === 1 && 'Family basics'}
                {currentStep === 2 && 'Financial profile'}
                {currentStep === 3 && 'Student profile'}
              </span>
            </div>
            <div className="h-1 bg-stone-light rounded-full overflow-hidden">
              <div
                className="h-full bg-rust transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Family Basics */}
          {currentStep === 1 && (
            <div className="space-y-10">
              <div>
                <h1 className="font-display font-black text-display-md text-ink mb-3">
                  Let&apos;s get the basics
                </h1>
                <p className="text-stone-warm">
                  This helps us show you accurate pricing for your situation.
                </p>
              </div>

              {/* Household Income */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  What&apos;s your household income?
                </label>
                <p className="text-sm text-stone-warm">
                  This is used to show net prices for families like yours.
                </p>
                <select
                  value={profile.householdIncome}
                  onChange={(e) => updateProfile('householdIncome', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {INCOME_BRACKETS.map((bracket) => (
                    <option key={bracket.id} value={bracket.id}>
                      {bracket.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Home State */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Where do you live?
                </label>
                <p className="text-sm text-stone-warm">
                  We&apos;ll flag in-state schools and show you in-state pricing.
                </p>
                <select
                  value={profile.homeState}
                  onChange={(e) => updateProfile('homeState', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marital Status */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Marital status
                </label>
                <p className="text-sm text-stone-warm">
                  This affects how financial aid is calculated.
                </p>
                <select
                  value={profile.maritalStatus}
                  onChange={(e) => updateProfile('maritalStatus', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {MARITAL_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children in College */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  How many children will be in college at the same time?
                </label>
                <p className="text-sm text-stone-warm">
                  More kids in college = more financial aid eligibility.
                </p>
                <div className="flex gap-3">
                  {CHILDREN_IN_COLLEGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateProfile('childrenInCollege', option.value)}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 text-lg font-medium transition-all ${
                        profile.childrenInCollege === option.value
                          ? 'border-rust bg-rust text-cream'
                          : 'border-stone-light bg-white text-ink hover:border-rust'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Profile */}
          {currentStep === 2 && (
            <div className="space-y-10">
              <div>
                <h1 className="font-display font-black text-display-md text-ink mb-3">
                  Financial details
                </h1>
                <p className="text-stone-warm">
                  Optional but helpful - these affect your expected family contribution.
                </p>
              </div>

              {/* Savings & Investments */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Total savings and investments
                </label>
                <p className="text-sm text-stone-warm">
                  Include checking, savings, stocks, and other investments (not retirement accounts).
                </p>
                <select
                  value={profile.savingsInvestments}
                  onChange={(e) => updateProfile('savingsInvestments', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {SAVINGS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Home Equity */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Home equity
                </label>
                <p className="text-sm text-stone-warm">
                  Home value minus mortgage balance. Matters for CSS Profile schools (mostly private colleges).
                </p>
                <select
                  value={profile.homeEquity}
                  onChange={(e) => updateProfile('homeEquity', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {HOME_EQUITY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 529 Balance */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  529 college savings plan balance
                </label>
                <p className="text-sm text-stone-warm">
                  529 assets are counted as parental assets, which affects aid at a lower rate than student assets.
                </p>
                <select
                  value={profile.balance529}
                  onChange={(e) => updateProfile('balance529', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {BALANCE_529_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Circumstances */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Any special circumstances?
                </label>
                <p className="text-sm text-stone-warm">
                  These can be grounds for a financial aid appeal. Check any that apply.
                </p>
                <div className="space-y-3">
                  {SPECIAL_CIRCUMSTANCES.map((circumstance) => (
                    <label
                      key={circumstance.id}
                      className="flex items-center gap-3 p-3 rounded-lg border-2 border-stone-light bg-white cursor-pointer hover:border-rust transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={profile.specialCircumstances?.includes(circumstance.id) || false}
                        onChange={() => toggleSpecialCircumstance(circumstance.id)}
                        className="w-5 h-5 rounded border-stone-light text-rust focus:ring-rust"
                      />
                      <span className="text-ink">{circumstance.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Student Profile */}
          {currentStep === 3 && (
            <div className="space-y-10">
              <div>
                <h1 className="font-display font-black text-display-md text-ink mb-3">
                  About the student
                </h1>
                <p className="text-stone-warm">
                  Academic info helps us estimate merit aid and admissions chances.
                </p>
              </div>

              {/* GPA - Unweighted */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Unweighted GPA
                </label>
                <p className="text-sm text-stone-warm">
                  On a 4.0 scale. Leave blank if unknown.
                </p>
                <input
                  type="text"
                  value={profile.studentGPA}
                  onChange={(e) => updateProfile('studentGPA', e.target.value)}
                  placeholder="e.g., 3.7"
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* GPA - Weighted */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Weighted GPA <span className="font-normal text-stone-warm">(optional)</span>
                </label>
                <p className="text-sm text-stone-warm">
                  If your school uses weighted GPAs (often above 4.0).
                </p>
                <input
                  type="text"
                  value={profile.weightedGPA}
                  onChange={(e) => updateProfile('weightedGPA', e.target.value)}
                  placeholder="e.g., 4.2"
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* SAT Score */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  SAT score
                </label>
                <p className="text-sm text-stone-warm">
                  Total score (400-1600). Many schools are test-optional now.
                </p>
                <input
                  type="text"
                  value={profile.satScore}
                  onChange={(e) => updateProfile('satScore', e.target.value)}
                  placeholder="e.g., 1350 or leave blank"
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* ACT Score */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  ACT score
                </label>
                <p className="text-sm text-stone-warm">
                  Composite score (1-36). Leave blank if not taken.
                </p>
                <input
                  type="text"
                  value={profile.actScore}
                  onChange={(e) => updateProfile('actScore', e.target.value)}
                  placeholder="e.g., 28 or leave blank"
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* Class Rank */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Class rank
                </label>
                <p className="text-sm text-stone-warm">
                  Many schools no longer rank students - that&apos;s fine.
                </p>
                <select
                  value={profile.classRank}
                  onChange={(e) => updateProfile('classRank', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {CLASS_RANK_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intended Major */}
              <div className="space-y-3">
                <label className="block font-medium text-ink">
                  Intended major
                </label>
                <p className="text-sm text-stone-warm">
                  Some majors (engineering, nursing) may cost more at certain schools.
                </p>
                <select
                  value={profile.intendedMajor}
                  onChange={(e) => updateProfile('intendedMajor', e.target.value)}
                  className="w-full border-2 border-stone-light rounded-lg px-4 py-3 text-lg focus:border-rust focus:outline-none transition-colors bg-white"
                >
                  {INTENDED_MAJOR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-12 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="text-stone-warm hover:text-ink transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 font-medium hover:bg-rust transition-colors duration-300"
            >
              <span>{currentStep === TOTAL_STEPS ? 'See colleges' : 'Continue'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
