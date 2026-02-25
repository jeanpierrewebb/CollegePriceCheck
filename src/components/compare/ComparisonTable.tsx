'use client';

import { School, IncomeBracket, SortField, SortConfig } from '@/lib/types';
import SchoolRow from './SchoolRow';

interface ComparisonTableProps {
  schools: School[];
  selectedBracket: IncomeBracket;
  homeState: string;
  expandedSchools: Set<number>;
  onToggleExpand: (id: number) => void;
  onRemoveSchool: (id: number) => void;
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
}

function SortIndicator({ field, sortConfig }: { field: SortField; sortConfig: SortConfig | null }) {
  if (!sortConfig || sortConfig.field !== field) {
    return <span className="ml-1 opacity-0 group-hover:opacity-40 transition-opacity">&uarr;</span>;
  }
  return (
    <span className="ml-1">
      {sortConfig.direction === 'asc' ? '\u2191' : '\u2193'}
    </span>
  );
}

export default function ComparisonTable({
  schools,
  selectedBracket,
  homeState,
  expandedSchools,
  onToggleExpand,
  onRemoveSchool,
  sortConfig,
  onSort,
}: ComparisonTableProps) {
  const headerClass =
    'px-6 py-3 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-rust-light transition-colors group select-none';

  return (
    <section className="px-6 md:px-12 pb-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ink text-cream">
            <tr>
              <th
                className={`${headerClass} text-left text-cream`}
                onClick={() => onSort('name')}
              >
                School
                <SortIndicator field="name" sortConfig={sortConfig} />
              </th>
              <th
                className={`${headerClass} text-right text-cream`}
                onClick={() => onSort('coa')}
              >
                <div>Published Cost</div>
                <div className="normal-case font-normal text-cream/60 text-[10px]">
                  Before financial aid
                </div>
                <SortIndicator field="coa" sortConfig={sortConfig} />
              </th>
              <th
                className={`${headerClass} text-right text-cream`}
                onClick={() => onSort('netPrice')}
              >
                <div>Net Price</div>
                <div className="normal-case font-normal text-cream/60 text-[10px]">
                  {selectedBracket.label}
                </div>
                <SortIndicator field="netPrice" sortConfig={sortConfig} />
              </th>
              <th
                className={`${headerClass} text-right text-cream`}
                onClick={() => onSort('debt')}
              >
                Median Debt
                <SortIndicator field="debt" sortConfig={sortConfig} />
              </th>
              <th
                className={`${headerClass} text-right text-cream`}
                onClick={() => onSort('gradRate')}
              >
                <div>4-Year</div>
                <div>Grad Rate</div>
                <SortIndicator field="gradRate" sortConfig={sortConfig} />
              </th>
              <th className="px-6 py-3 text-xs font-medium text-cream w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light">
            {schools.map((school) => (
              <SchoolRow
                key={school.id}
                school={school}
                bracket={selectedBracket}
                homeState={homeState}
                isExpanded={expandedSchools.has(school.id)}
                onToggle={() => onToggleExpand(school.id)}
                onRemove={() => onRemoveSchool(school.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Debt Legend */}
      <div className="py-4 text-sm border-t border-stone-light flex flex-wrap gap-x-4 gap-y-1">
        <span className="font-medium text-ink">Debt indicator:</span>
        <span className="text-forest">&bull; Under $30K &mdash; Manageable</span>
        <span className="text-rust-light">&bull; $30K&ndash;$50K &mdash; Caution</span>
        <span className="text-rust-dark">&bull; Over $50K &mdash; High Risk</span>
      </div>
    </section>
  );
}
