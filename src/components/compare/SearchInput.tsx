'use client';

import { School } from '@/lib/types';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredSchools: School[];
  onAddSchool: (school: School) => void;
  maxReached: boolean;
}

export default function SearchInput({
  searchQuery,
  onSearchChange,
  filteredSchools,
  onAddSchool,
  maxReached,
}: SearchInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-stone-warm mb-2">
        Add Schools
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredSchools.length > 0 && !maxReached) {
              onAddSchool(filteredSchools[0]);
            }
          }}
          placeholder={maxReached ? 'Maximum 10 schools reached' : 'Type a school name...'}
          disabled={maxReached}
          className="w-full border border-stone-light bg-cream px-4 py-2.5 text-ink placeholder:text-stone-warm focus:outline-none focus:ring-2 focus:ring-rust focus:border-rust disabled:opacity-50"
        />
        {filteredSchools.length > 0 && !maxReached && (
          <div className="absolute z-10 w-full mt-1 bg-cream border border-stone-light shadow-lg max-h-60 overflow-y-auto">
            {filteredSchools.map((school) => (
              <button
                key={school.id}
                onClick={() => onAddSchool(school)}
                className="w-full text-left px-4 py-2.5 hover:bg-stone-light/50 border-b border-stone-light/50 last:border-b-0 transition-colors"
              >
                <div className="font-display font-black text-sm text-ink">
                  {school['school.name']}
                </div>
                <div className="text-xs text-stone-warm">
                  {school['school.city']}, {school['school.state']}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
