import { IncomeBracket, USState } from './types';

export const US_STATES: USState[] = [
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

export const INCOME_BRACKETS: IncomeBracket[] = [
  { id: '0-30000', label: '$0 - $30,000', publicKey: 'latest.cost.net_price.public.by_income_level.0-30000', privateKey: 'latest.cost.net_price.private.by_income_level.0-30000', midpointIncome: 15000 },
  { id: '30001-48000', label: '$30,001 - $48,000', publicKey: 'latest.cost.net_price.public.by_income_level.30001-48000', privateKey: 'latest.cost.net_price.private.by_income_level.30001-48000', midpointIncome: 39000 },
  { id: '48001-75000', label: '$48,001 - $75,000', publicKey: 'latest.cost.net_price.public.by_income_level.48001-75000', privateKey: 'latest.cost.net_price.private.by_income_level.48001-75000', midpointIncome: 61500 },
  { id: '75001-110000', label: '$75,001 - $110,000', publicKey: 'latest.cost.net_price.public.by_income_level.75001-110000', privateKey: 'latest.cost.net_price.private.by_income_level.75001-110000', midpointIncome: 92500 },
  { id: '110001-plus', label: '$110,001+', publicKey: 'latest.cost.net_price.public.by_income_level.110001-plus', privateKey: 'latest.cost.net_price.private.by_income_level.110001-plus', midpointIncome: 140000 },
];

export const DEFAULT_BRACKET_INDEX = 2;
export const ANNUAL_INCREASE_RATE = 0.05;
export const FEDERAL_LOAN_RATE = 0.055;
export const STANDARD_REPAYMENT_YEARS = 10;
export const FPL_2024 = 15060;
export const IDR_INCOME_PERCENT = 0.10;
export const IDR_FPL_MULTIPLIER = 2.25;

export const DEBT_THRESHOLDS = {
  manageable: 30000,
  caution: 50000,
};
