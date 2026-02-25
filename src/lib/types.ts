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
