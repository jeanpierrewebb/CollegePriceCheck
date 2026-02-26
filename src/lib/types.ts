// School data types from College Scorecard API

export interface School {
  id: number;
  'school.name': string;
  'school.city': string;
  'school.state': string;
  'school.ownership': number;
  'school.locale': number;
  'latest.cost.tuition.in_state': number | null;
  'latest.cost.tuition.out_of_state': number | null;
  'latest.cost.avg_net_price.overall': number | null;
  'latest.cost.attendance.academic_year': number | null;
  'latest.cost.attendance.program_year': number | null;
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
  'latest.student.size': number | null;
  'latest.admissions.admission_rate.overall': number | null;
}

export interface IncomeBracket {
  id: string;
  label: string;
  publicKey: string;
  privateKey: string;
  midpointIncome: number;
}

export type SortField = 'name' | 'coa' | 'netPrice' | 'debt' | 'gradRate';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface USState {
  code: string;
  name: string;
}

// User profile types for onboarding and personalization

export interface FamilyProfile {
  // Step 1: Family basics
  householdIncome: string;
  homeState: string;
  childrenInCollege: number;
  maritalStatus: 'married' | 'single' | 'separated' | 'widowed' | '';
  
  // Step 2: Financial profile
  savingsInvestments: string;
  homeEquity: string;
  balance529: string;
  specialCircumstances: string[];
  
  // Step 3: Student profile (future)
  studentGPA?: string;
  satScore?: string;
  actScore?: string;
}

export const INCOME_BRACKETS = [
  { id: '0-30000', label: '$0 - $30,000' },
  { id: '30001-48000', label: '$30,001 - $48,000' },
  { id: '48001-75000', label: '$48,001 - $75,000' },
  { id: '75001-110000', label: '$75,001 - $110,000' },
  { id: '110001-plus', label: '$110,001+' },
];

export const US_STATES = [
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

export const MARITAL_STATUS_OPTIONS = [
  { value: '', label: 'Select status' },
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' },
  { value: 'separated', label: 'Separated/Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export const CHILDREN_IN_COLLEGE_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4+' },
];

// Step 2: Financial profile options
export const SAVINGS_OPTIONS = [
  { value: '', label: 'Select range' },
  { value: 'under-25k', label: 'Less than $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: 'over-250k', label: 'More than $250,000' },
  { value: 'prefer-not', label: 'Prefer not to say' },
];

export const HOME_EQUITY_OPTIONS = [
  { value: '', label: 'Select option' },
  { value: 'rent', label: 'I rent (no home equity)' },
  { value: 'under-100k', label: 'Less than $100,000 equity' },
  { value: '100k-250k', label: '$100,000 - $250,000 equity' },
  { value: '250k-500k', label: '$250,000 - $500,000 equity' },
  { value: 'over-500k', label: 'More than $500,000 equity' },
  { value: 'prefer-not', label: 'Prefer not to say' },
];

export const BALANCE_529_OPTIONS = [
  { value: '', label: 'Select range' },
  { value: 'none', label: 'No 529 plan' },
  { value: 'under-25k', label: 'Less than $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'More than $100,000' },
  { value: 'prefer-not', label: 'Prefer not to say' },
];

export const SPECIAL_CIRCUMSTANCES = [
  { id: 'job-loss', label: 'Recent job loss or income reduction' },
  { id: 'medical', label: 'Significant medical expenses' },
  { id: 'divorce', label: 'Divorce or separation in progress' },
  { id: 'eldercare', label: 'Supporting elderly parents' },
  { id: 'other', label: 'Other unusual circumstances' },
];

export const DEFAULT_PROFILE: FamilyProfile = {
  householdIncome: '48001-75000',
  homeState: '',
  childrenInCollege: 1,
  maritalStatus: '',
  savingsInvestments: '',
  homeEquity: '',
  balance529: '',
  specialCircumstances: [],
};
