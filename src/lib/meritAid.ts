/**
 * Merit Aid Likelihood Estimator
 * 
 * Estimates likelihood of receiving merit-based scholarships.
 * This is probabilistic - actual awards vary significantly.
 * 
 * Key factors:
 * - Student stats vs school selectivity
 * - School's general merit aid practices
 * - Private vs public (privates often more generous with merit)
 */

import { School } from './types';
import { AdmissionChance } from './admissionChances';

export type MeritLikelihood = 'high' | 'possible' | 'unlikely' | 'none' | 'unknown';

export interface MeritAidResult {
  likelihood: MeritLikelihood;
  label: string;
  color: string;
  explanation: string;
}

interface StudentProfile {
  studentGPA?: string;
  satScore?: string;
  actScore?: string;
}

// Schools that famously don't offer merit aid (need-based only)
const NO_MERIT_AID_SCHOOLS = [
  'harvard', 'yale', 'princeton', 'columbia', 'brown', 'cornell', 'dartmouth', 'penn',
  'stanford', 'mit', 'caltech', 'amherst', 'williams', 'bowdoin', 'swarthmore'
];

/**
 * Estimate merit aid likelihood for a school
 */
export function estimateMeritAid(
  school: School, 
  profile: StudentProfile,
  admissionChance: AdmissionChance
): MeritAidResult {
  const schoolName = school['school.name']?.toLowerCase() || '';
  const admissionRate = school['latest.admissions.admission_rate.overall'];
  const isPrivate = school['school.ownership'] === 2;
  
  // Check if this is a no-merit-aid school
  const isNoMeritSchool = NO_MERIT_AID_SCHOOLS.some(name => schoolName.includes(name));
  if (isNoMeritSchool) {
    return {
      likelihood: 'none',
      label: 'Need-Based Only',
      color: 'text-stone-warm',
      explanation: 'This school offers financial aid based on need only, not academic merit.',
    };
  }

  // Parse student GPA
  const gpa = profile.studentGPA ? parseFloat(profile.studentGPA) : null;
  const hasGPA = gpa !== null && !isNaN(gpa) && gpa > 0;

  // If no admission data, can't estimate
  if (admissionRate === null || admissionRate === undefined) {
    return {
      likelihood: 'unknown',
      label: 'Unknown',
      color: 'text-stone-warm',
      explanation: 'Insufficient data to estimate merit aid likelihood.',
    };
  }

  // Very selective schools (<20% admission) rarely give merit aid
  if (admissionRate < 0.2) {
    return {
      likelihood: 'unlikely',
      label: 'Merit Unlikely',
      color: 'text-rust-dark',
      explanation: 'Highly selective schools rarely offer merit-based aid.',
    };
  }

  // For less selective schools, estimate based on student stats and school type
  let likelihood: MeritLikelihood = 'possible';

  // Safety schools with good GPA = high merit likelihood
  if (admissionChance === 'safety' && hasGPA && gpa! >= 3.5) {
    likelihood = 'high';
  } else if (admissionChance === 'safety') {
    likelihood = 'possible';
  } else if (admissionChance === 'match' && hasGPA && gpa! >= 3.7) {
    likelihood = 'possible';
  } else if (admissionChance === 'reach') {
    likelihood = 'unlikely';
  }

  // Private schools often more generous with merit
  if (isPrivate && likelihood === 'possible' && hasGPA && gpa! >= 3.5) {
    likelihood = 'high';
  }

  // Schools with high admission rates (>60%) often use merit to attract strong students
  if (admissionRate > 0.6 && hasGPA && gpa! >= 3.5) {
    likelihood = 'high';
  }

  return getResultForLikelihood(likelihood, isPrivate, hasGPA);
}

function getResultForLikelihood(likelihood: MeritLikelihood, isPrivate: boolean, hasGPA: boolean): MeritAidResult {
  const gpaNote = hasGPA ? '' : ' Add GPA for better estimate.';
  const privateNote = isPrivate ? ' Private schools often have more merit aid.' : '';
  
  switch (likelihood) {
    case 'high':
      return {
        likelihood: 'high',
        label: 'Merit Likely',
        color: 'text-forest',
        explanation: `Strong chance of merit scholarships based on your profile.${privateNote}${gpaNote}`,
      };
    case 'possible':
      return {
        likelihood: 'possible',
        label: 'Merit Possible',
        color: 'text-rust-light',
        explanation: `You may qualify for merit scholarships — apply early and explore options.${gpaNote}`,
      };
    case 'unlikely':
      return {
        likelihood: 'unlikely',
        label: 'Merit Unlikely',
        color: 'text-rust-dark',
        explanation: `Merit aid is competitive at this school. Focus on need-based aid.${gpaNote}`,
      };
    case 'none':
      return {
        likelihood: 'none',
        label: 'No Merit Aid',
        color: 'text-stone-warm',
        explanation: 'This school only offers need-based financial aid.',
      };
    default:
      return {
        likelihood: 'unknown',
        label: 'Unknown',
        color: 'text-stone-warm',
        explanation: 'Unable to estimate merit aid likelihood.',
      };
  }
}
