'use client';

import { useState, useEffect } from 'react';
import { School, IncomeBracket } from '@/lib/types';
import { formatCurrency, formatPercent, getDebtColor, getNetPrice, getCOA } from '@/lib/formatters';
import { classifySchool, getStudentProfile, AdmissionResult } from '@/lib/admissionChances';
import { estimateMeritAid, MeritAidResult } from '@/lib/meritAid';
import BracketBreakdown from './BracketBreakdown';
import CostProjection from './CostProjection';
import DebtReality from './DebtReality';

interface SchoolRowProps {
  school: School;
  bracket: IncomeBracket;
  homeState: string;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

export default function SchoolRow({
  school,
  bracket,
  homeState,
  isExpanded,
  onToggle,
  onRemove,
}: SchoolRowProps) {
  const netPrice = getNetPrice(school, bracket);
  const debt = school['latest.aid.median_debt.completers.overall'];
  const gradRate = school['latest.completion.rate_suppressed.four_year'];
  const coa = getCOA(school, homeState);
  const isInState = homeState !== '' && school['school.state'] === homeState;
  
  const [admissionResult, setAdmissionResult] = useState<AdmissionResult | null>(null);
  const [meritResult, setMeritResult] = useState<MeritAidResult | null>(null);
  
  useEffect(() => {
    const profile = getStudentProfile();
    const admission = classifySchool(school, profile);
    setAdmissionResult(admission);
    
    const merit = estimateMeritAid(school, profile, admission.chance);
    setMeritResult(merit);
  }, [school]);

  return (
    <>
      <tr
        className="hover:bg-stone-light/30 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs text-stone-warm transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            >
              &#9654;
            </span>
            <div>
              <div className="font-display font-black text-ink flex items-center gap-2 flex-wrap">
                {school['school.name']}
                {isInState && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-body font-medium bg-forest/10 text-forest">
                    In-State
                  </span>
                )}
                {admissionResult && admissionResult.chance !== 'unknown' && (
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-body font-medium ${admissionResult.bgColor} ${admissionResult.color}`}
                    title={admissionResult.explanation}
                  >
                    {admissionResult.label}
                  </span>
                )}
              </div>
              <div className="text-sm text-stone-warm">
                {school['school.city']}, {school['school.state']}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="font-display font-black text-ink">
            {formatCurrency(coa.value)}
          </div>
          {coa.label && (
            <div className="text-xs text-stone-warm">
              {coa.label}
              {coa.isTuitionOnly && ' (Tuition Only)'}
            </div>
          )}
          {/* Show both prices for public schools when user has a home state */}
          {homeState && school['school.ownership'] === 1 && !isInState && school['latest.cost.tuition.in_state'] && (
            <div className="text-xs text-forest mt-1">
              In-state: {formatCurrency(school['latest.cost.tuition.in_state'])}
            </div>
          )}
          {!homeState && school['school.ownership'] === 1 && (
            <div className="text-xs text-rust">Set home state</div>
          )}
        </td>
        <td className="px-6 py-4 text-right">
          <span className="font-display font-black text-ink">
            {formatCurrency(netPrice)}
          </span>
          {netPrice !== null && (
            <span className="text-xs text-stone-warm font-body">/yr</span>
          )}
          {/* Note for out-of-state public school viewing */}
          {homeState && school['school.ownership'] === 1 && !isInState && (
            <div className="text-xs text-stone-warm mt-1">Avg. all students</div>
          )}
        </td>
        <td className={`px-6 py-4 text-right font-display font-black ${getDebtColor(debt)}`}>
          {formatCurrency(debt)}
        </td>
        <td className="px-6 py-4 text-right font-display font-black text-ink">
          {formatPercent(gradRate)}
        </td>
        <td className="px-6 py-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-stone-warm hover:text-rust-dark transition-colors text-lg"
          >
            &times;
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-0 py-0">
            <div className="bg-stone-light/20 border-t border-b border-stone-light">
              <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BracketBreakdown school={school} selectedBracket={bracket} />
                <div className="space-y-8">
                  <CostProjection netPrice={netPrice} />
                  <DebtReality debt={debt} bracket={bracket} />
                  
                  {/* Merit Aid Estimate */}
                  {meritResult && meritResult.likelihood !== 'unknown' && (
                    <div className="border-t border-stone-light pt-6">
                      <h4 className="font-display font-black text-sm text-ink mb-2">Merit Aid Estimate</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${meritResult.color} bg-stone-light`}>
                          {meritResult.label}
                        </span>
                      </div>
                      <p className="text-sm text-stone-warm">{meritResult.explanation}</p>
                      <p className="text-xs text-stone-warm mt-2 italic">
                        Note: Actual awards vary. Apply for specific scholarships at each school.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
