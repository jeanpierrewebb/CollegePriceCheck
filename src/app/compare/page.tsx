'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAliasMatches } from '@/lib/schoolAliases';
import { School, IncomeBracket, SortField, SortConfig } from '@/lib/types';
import { INCOME_BRACKETS, DEFAULT_BRACKET_INDEX } from '@/lib/constants';
import { getNetPrice, getCOA } from '@/lib/formatters';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ControlPanel from '@/components/compare/ControlPanel';
import ComparisonTable from '@/components/compare/ComparisonTable';
import EmptyState from '@/components/compare/EmptyState';
import SAIDisplay from '@/components/SAIDisplay';

const DEFAULT_SORT_DIRECTIONS: Record<SortField, 'asc' | 'desc'> = {
  name: 'asc',
  coa: 'asc',
  netPrice: 'asc',
  debt: 'asc',
  gradRate: 'desc',
};

export default function ComparePage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBracket, setSelectedBracket] = useState<IncomeBracket>(INCOME_BRACKETS[DEFAULT_BRACKET_INDEX]);
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [homeState, setHomeState] = useState('');
  const [expandedSchools, setExpandedSchools] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  useEffect(() => {
    fetch('/api/schools')
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load schools:', err);
        setLoading(false);
      });
  }, []);

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('collegepricecheck_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const profile = parsed.profile || parsed;
        
        // Set home state if available
        if (profile.homeState) {
          setHomeState(profile.homeState);
        }
        
        // Set income bracket if available
        if (profile.householdIncome) {
          const bracket = INCOME_BRACKETS.find(b => b.id === profile.householdIncome);
          if (bracket) {
            setSelectedBracket(bracket);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    }
  }, []);

  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const aliasMatches = getAliasMatches(query);

    return schools
      .filter((school) => {
        if (selectedSchools.find((s) => s.id === school.id)) return false;
        const schoolName = school['school.name']?.toLowerCase() || '';
        const schoolCity = school['school.city']?.toLowerCase() || '';
        const schoolState = school['school.state']?.toLowerCase() || '';
        if (schoolName.includes(query) || schoolCity.includes(query) || schoolState.includes(query)) {
          return true;
        }
        if (aliasMatches.length > 0) {
          return aliasMatches.some((alias) => schoolName.includes(alias));
        }
        return false;
      })
      .slice(0, 10);
  }, [schools, searchQuery, selectedSchools]);

  const sortedSchools = useMemo(() => {
    if (!sortConfig) return selectedSchools;

    return [...selectedSchools].sort((a, b) => {
      let aVal: number | string | null = null;
      let bVal: number | string | null = null;

      switch (sortConfig.field) {
        case 'name':
          aVal = a['school.name'] || '';
          bVal = b['school.name'] || '';
          break;
        case 'coa':
          aVal = getCOA(a, homeState).value;
          bVal = getCOA(b, homeState).value;
          break;
        case 'netPrice':
          aVal = getNetPrice(a, selectedBracket);
          bVal = getNetPrice(b, selectedBracket);
          break;
        case 'debt':
          aVal = a['latest.aid.median_debt.completers.overall'];
          bVal = b['latest.aid.median_debt.completers.overall'];
          break;
        case 'gradRate':
          aVal = a['latest.completion.rate_suppressed.four_year'];
          bVal = b['latest.completion.rate_suppressed.four_year'];
          break;
      }

      // Nulls always sort to bottom
      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      let comparison: number;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = (aVal as number) - (bVal as number);
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [selectedSchools, sortConfig, selectedBracket, homeState]);

  const addSchool = useCallback((school: School) => {
    if (selectedSchools.length >= 10) return;
    if (selectedSchools.find((s) => s.id === school.id)) return;
    setSelectedSchools((prev) => [...prev, school]);
    setSearchQuery('');
  }, [selectedSchools]);

  const removeSchool = useCallback((schoolId: number) => {
    setSelectedSchools((prev) => prev.filter((s) => s.id !== schoolId));
    setExpandedSchools((prev) => {
      const next = new Set(prev);
      next.delete(schoolId);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((schoolId: number) => {
    setExpandedSchools((prev) => {
      const next = new Set(prev);
      if (next.has(schoolId)) {
        next.delete(schoolId);
      } else {
        next.add(schoolId);
      }
      return next;
    });
  }, []);

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prev) => {
      if (prev && prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { field, direction: DEFAULT_SORT_DIRECTIONS[field] };
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-cream">
        <Nav />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-lg text-stone-warm font-display">Loading 1,983 colleges...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <Nav
        rightContent={
          <div className="flex items-center gap-4">
            <a
              href="/onboarding"
              className="text-sm text-stone-warm hover:text-rust transition-colors"
            >
              Edit Profile
            </a>
            <span className="text-sm text-stone-warm">
              {selectedSchools.length}/10 schools
            </span>
          </div>
        }
      />

      <div className="pt-20">
        {/* Page header */}
        <div className="px-6 md:px-12 pt-8 pb-6">
          <h1 className="font-display font-black text-display-md text-ink">
            Compare Colleges
          </h1>
          <p className="mt-2 text-stone-warm">
            Side-by-side costs for families in your income bracket.
          </p>
        </div>

        <ControlPanel
          homeState={homeState}
          onHomeStateChange={setHomeState}
          selectedBracket={selectedBracket}
          onBracketChange={setSelectedBracket}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredSchools={filteredSchools}
          onAddSchool={addSchool}
          selectedCount={selectedSchools.length}
        />

        {/* SAI Estimate */}
        <div className="px-6 md:px-12 py-4">
          <SAIDisplay />
        </div>

        {selectedSchools.length > 0 ? (
          <ComparisonTable
            schools={sortedSchools}
            selectedBracket={selectedBracket}
            homeState={homeState}
            expandedSchools={expandedSchools}
            onToggleExpand={toggleExpand}
            onRemoveSchool={removeSchool}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          <EmptyState />
        )}

        {/* Data source */}
        <p className="px-6 md:px-12 py-6 text-center text-sm text-stone-warm">
          Data source: U.S. Department of Education College Scorecard (2023-24)
        </p>
      </div>

      <Footer />
    </main>
  );
}
