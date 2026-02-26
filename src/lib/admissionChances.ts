/**
 * Reach/Match/Safety Calculator
 * 
 * Estimates admission chances based on:
 * - School's admission rate
 * - Student's GPA (when available)
 * 
 * This is a simplified model. Real admissions consider many factors.
 */

import { School } from './types';

export type AdmissionChance = 'safety' | 'match' | 'reach' | 'unknown';

export interface AdmissionResult {
  chance: AdmissionChance;
  label: string;
  color: string;
  bgColor: string;
  explanation: string;
}

interface StudentProfile {
  studentGPA?: string;
  satScore?: string;
  actScore?: string;
}

/**
 * Classify a school as Reach/Match/Safety based on student profile
 */
export function classifySchool(school: School, profile: StudentProfile): AdmissionResult {
  const admissionRate = school['latest.admissions.admission_rate.overall'];
  
  // If no admission rate data, can't classify
  if (admissionRate === null || admissionRate === undefined) {
    return {
      chance: 'unknown',
      label: 'Unknown',
      color: 'text-stone-warm',
      bgColor: 'bg-stone-light',
      explanation: 'Admission data not available for this school.',
    };
  }

  // Parse student GPA if available
  const gpa = profile.studentGPA ? parseFloat(profile.studentGPA) : null;
  const hasGPA = gpa !== null && !isNaN(gpa) && gpa > 0 && gpa <= 5.0;

  // Base classification on admission rate
  // Then adjust based on student GPA if available
  let baseChance: AdmissionChance;
  
  if (admissionRate >= 0.7) {
    // 70%+ acceptance = generally accessible
    baseChance = 'safety';
  } else if (admissionRate >= 0.4) {
    // 40-70% acceptance = moderately selective
    baseChance = 'match';
  } else if (admissionRate >= 0.2) {
    // 20-40% acceptance = selective
    baseChance = 'reach';
  } else {
    // <20% acceptance = highly selective
    baseChance = 'reach';
  }

  // Adjust based on GPA if available
  if (hasGPA) {
    if (gpa! >= 3.8) {
      // Strong GPA - upgrade by one level
      if (baseChance === 'reach' && admissionRate >= 0.15) {
        baseChance = 'match';
      } else if (baseChance === 'match') {
        baseChance = 'safety';
      }
    } else if (gpa! >= 3.5) {
      // Good GPA - keep as is or slight upgrade for less selective
      if (baseChance === 'match' && admissionRate >= 0.5) {
        baseChance = 'safety';
      }
    } else if (gpa! < 3.0) {
      // Lower GPA - downgrade by one level
      if (baseChance === 'safety') {
        baseChance = 'match';
      } else if (baseChance === 'match') {
        baseChance = 'reach';
      }
    }
  }

  // Very selective schools (<15%) are always reach unless exceptional stats
  if (admissionRate < 0.15) {
    baseChance = 'reach';
  }

  return getResultForChance(baseChance, admissionRate, hasGPA);
}

function getResultForChance(chance: AdmissionChance, admissionRate: number, hasGPA: boolean): AdmissionResult {
  const ratePercent = Math.round(admissionRate * 100);
  const gpaNote = hasGPA ? '' : ' (Add GPA for better estimate)';
  
  switch (chance) {
    case 'safety':
      return {
        chance: 'safety',
        label: 'Safety',
        color: 'text-forest',
        bgColor: 'bg-forest/10',
        explanation: `${ratePercent}% acceptance rate. You're likely to be admitted.${gpaNote}`,
      };
    case 'match':
      return {
        chance: 'match',
        label: 'Match',
        color: 'text-rust-light',
        bgColor: 'bg-rust-light/10',
        explanation: `${ratePercent}% acceptance rate. Good chance if your application is strong.${gpaNote}`,
      };
    case 'reach':
      return {
        chance: 'reach',
        label: 'Reach',
        color: 'text-rust-dark',
        bgColor: 'bg-rust-dark/10',
        explanation: `${ratePercent}% acceptance rate. Competitive — have backup options.${gpaNote}`,
      };
    default:
      return {
        chance: 'unknown',
        label: 'Unknown',
        color: 'text-stone-warm',
        bgColor: 'bg-stone-light',
        explanation: 'Unable to estimate admission chances.',
      };
  }
}

/**
 * Load student profile from localStorage
 */
export function getStudentProfile(): StudentProfile {
  try {
    const saved = localStorage.getItem('collegepricecheck_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      const profile = parsed.profile || parsed;
      return {
        studentGPA: profile.studentGPA || '',
        satScore: profile.satScore || '',
        actScore: profile.actScore || '',
      };
    }
  } catch (e) {
    console.error('Failed to load student profile:', e);
  }
  return {};
}
