'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getAliasMatches } from '@/lib/schoolAliases';

interface School {
  id: number;
  'school.name': string;
  'school.city': string;
  'school.state': string;
  'latest.cost.avg_net_price.overall': number | null;
  'latest.cost.net_price.public.by_income_level.0-30000': number | null;
  'latest.cost.net_price.public.by_income_level.30001-48000': number | null;
  'latest.cost.net_price.public.by_income_level.48001-75000': number | null;
  'latest.cost.net_price.public.by_income_level.75001-110000': number | null;
  'latest.cost.net_price.public.by_income_level.110001-plus': number | null;
  'latest.cost.net_price.private.by_income_level.0-30000': number | null;
  'latest.cost.net_price.private.by_income_level.30001-48000': number | null;
  'latest.cost.net_price.private.by_income_level.48001-75000': number | null;
  'latest.cost.net_price.private.by_income_level.75001-110000': number | null;
  'latest.cost.net_price.private.by_income_level.110001-plus': number | null;
  'latest.aid.median_debt.completers.overall': number | null;
  'latest.completion.rate_suppressed.four_year': number | null;
}

const US_STATES = [
  { code: '', name: 'Select your state' },
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

const INCOME_BRACKETS = [
  { id: '0-30000', label: '$0 - $30,000', publicKey: 'latest.cost.net_price.public.by_income_level.0-30000', privateKey: 'latest.cost.net_price.private.by_income_level.0-30000' },
  { id: '30001-48000', label: '$30,001 - $48,000', publicKey: 'latest.cost.net_price.public.by_income_level.30001-48000', privateKey: 'latest.cost.net_price.private.by_income_level.30001-48000' },
  { id: '48001-75000', label: '$48,001 - $75,000', publicKey: 'latest.cost.net_price.public.by_income_level.48001-75000', privateKey: 'latest.cost.net_price.private.by_income_level.48001-75000' },
  { id: '75001-110000', label: '$75,001 - $110,000', publicKey: 'latest.cost.net_price.public.by_income_level.75001-110000', privateKey: 'latest.cost.net_price.private.by_income_level.75001-110000' },
  { id: '110001-plus', label: '$110,001+', publicKey: 'latest.cost.net_price.public.by_income_level.110001-plus', privateKey: 'latest.cost.net_price.private.by_income_level.110001-plus' },
];

function formatCurrency(value: number | null): string {
  if (value === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number | null): string {
  if (value === null) return 'N/A';
  return `${Math.round(value * 100)}%`;
}

function getDebtColor(debt: number | null): string {
  if (debt === null) return 'text-gray-500';
  if (debt < 20000) return 'text-green-600';
  if (debt < 30000) return 'text-yellow-600';
  return 'text-red-600';
}

function getNetPrice(school: School, bracket: typeof INCOME_BRACKETS[0]): number | null {
  const publicPrice = school[bracket.publicKey as keyof School] as number | null;
  const privatePrice = school[bracket.privateKey as keyof School] as number | null;
  return publicPrice ?? privatePrice;
}

export default function ComparePage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBracket, setSelectedBracket] = useState(INCOME_BRACKETS[2]); // Default to middle bracket
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [homeState, setHomeState] = useState('');

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

  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const aliasMatches = getAliasMatches(query);
    
    return schools
      .filter((school) => {
        const schoolName = school['school.name']?.toLowerCase() || '';
        const schoolCity = school['school.city']?.toLowerCase() || '';
        const schoolState = school['school.state']?.toLowerCase() || '';
        
        // Direct match on name, city, or state
        if (schoolName.includes(query) || schoolCity.includes(query) || schoolState.includes(query)) {
          return true;
        }
        
        // Check if any alias matches this school
        if (aliasMatches.length > 0) {
          return aliasMatches.some(alias => schoolName.includes(alias));
        }
        
        return false;
      })
      .slice(0, 10);
  }, [schools, searchQuery]);

  const addSchool = (school: School) => {
    if (selectedSchools.length >= 10) {
      alert('Maximum 10 schools for comparison');
      return;
    }
    if (selectedSchools.find((s) => s.id === school.id)) {
      return;
    }
    setSelectedSchools([...selectedSchools, school]);
    setSearchQuery('');
  };

  const removeSchool = (schoolId: number) => {
    setSelectedSchools(selectedSchools.filter((s) => s.id !== schoolId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading 1,983 colleges...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-700">
            CollegePriceCheck
          </Link>
          <div className="text-sm text-gray-500">
            {selectedSchools.length}/10 schools selected
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Home State Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Home State
              </label>
              <select
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                We&apos;ll flag in-state schools for you
              </p>
            </div>

            {/* Income Bracket Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Household Income
              </label>
              <select
                value={selectedBracket.id}
                onChange={(e) =>
                  setSelectedBracket(
                    INCOME_BRACKETS.find((b) => b.id === e.target.value) ||
                      INCOME_BRACKETS[2]
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {INCOME_BRACKETS.map((bracket) => (
                  <option key={bracket.id} value={bracket.id}>
                    {bracket.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                We&apos;ll show what families in this bracket actually paid
              </p>
            </div>

            {/* School Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Schools to Compare
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by school name, city, or state..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {filteredSchools.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredSchools.map((school) => (
                      <button
                        key={school.id}
                        onClick={() => addSchool(school)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium">{school['school.name']}</div>
                        <div className="text-sm text-gray-500">
                          {school['school.city']}, {school['school.state']}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedSchools.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Price<br />
                      <span className="normal-case font-normal">({selectedBracket.label})</span>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Median Debt
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      4-Year<br />Grad Rate
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {school['school.name']}
                          {homeState && school['school.state'] === homeState && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              In-State
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {school['school.city']}, {school['school.state']}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        {formatCurrency(getNetPrice(school, selectedBracket))}
                        <span className="text-xs text-gray-500 font-normal">/yr</span>
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold ${getDebtColor(school['latest.aid.median_debt.completers.overall'])}`}>
                        {formatCurrency(school['latest.aid.median_debt.completers.overall'])}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        {formatPercent(school['latest.completion.rate_suppressed.four_year'])}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeSchool(school.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Debt Legend */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm">
              <span className="font-medium">Debt indicator: </span>
              <span className="text-green-600">● Under $20K</span>
              <span className="mx-2">|</span>
              <span className="text-yellow-600">● $20K-$30K</span>
              <span className="mx-2">|</span>
              <span className="text-red-600">● Over $30K</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">🎓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No schools selected yet
            </h3>
            <p className="text-gray-500">
              Search above to add schools to your comparison
            </p>
          </div>
        )}

        {/* Data source note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Data source: U.S. Department of Education College Scorecard (2023-24)
        </p>
      </div>
    </main>
  );
}
