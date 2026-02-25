'use client';

import { School, IncomeBracket } from '@/lib/types';
import { US_STATES, INCOME_BRACKETS } from '@/lib/constants';
import SearchInput from './SearchInput';

interface ControlPanelProps {
  homeState: string;
  onHomeStateChange: (state: string) => void;
  selectedBracket: IncomeBracket;
  onBracketChange: (bracket: IncomeBracket) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredSchools: School[];
  onAddSchool: (school: School) => void;
  selectedCount: number;
}

export default function ControlPanel({
  homeState,
  onHomeStateChange,
  selectedBracket,
  onBracketChange,
  searchQuery,
  onSearchChange,
  filteredSchools,
  onAddSchool,
  selectedCount,
}: ControlPanelProps) {
  return (
    <section className="px-6 md:px-12 pb-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-warm mb-2">
            Your Home State
          </label>
          <select
            value={homeState}
            onChange={(e) => onHomeStateChange(e.target.value)}
            className="w-full border border-stone-light bg-cream px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-rust focus:border-rust"
          >
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-stone-warm">
            We&apos;ll flag in-state schools for you
          </p>
        </div>

        <div className="col-span-12 md:col-span-3">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-warm mb-2">
            Household Income
          </label>
          <select
            value={selectedBracket.id}
            onChange={(e) => {
              const bracket = INCOME_BRACKETS.find((b) => b.id === e.target.value);
              if (bracket) onBracketChange(bracket);
            }}
            className="w-full border border-stone-light bg-cream px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-rust focus:border-rust"
          >
            {INCOME_BRACKETS.map((bracket) => (
              <option key={bracket.id} value={bracket.id}>
                {bracket.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-stone-warm">
            Shows what families in this bracket actually paid
          </p>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            filteredSchools={filteredSchools}
            onAddSchool={onAddSchool}
            maxReached={selectedCount >= 10}
          />
        </div>
      </div>
    </section>
  );
}
