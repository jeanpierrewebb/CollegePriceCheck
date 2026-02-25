import { School, IncomeBracket } from './types';

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  return `${Math.round(value * 100)}%`;
}

export function getDebtColor(debt: number | null): string {
  if (debt === null) return 'text-stone-warm';
  if (debt < 30000) return 'text-forest';
  if (debt < 50000) return 'text-rust-light';
  return 'text-rust-dark';
}

export function getDebtLabel(debt: number | null): string {
  if (debt === null) return '';
  if (debt < 30000) return 'Manageable';
  if (debt < 50000) return 'Caution';
  return 'High Risk';
}

export function getNetPrice(school: School, bracket: IncomeBracket): number | null {
  const publicPrice = school[bracket.publicKey as keyof School] as number | null;
  const privatePrice = school[bracket.privateKey as keyof School] as number | null;
  return publicPrice ?? privatePrice ?? null;
}

export function getCOA(school: School, homeState: string): { value: number | null; label: string; isTuitionOnly: boolean } {
  const isPublic = school['school.ownership'] === 1;
  const coaAcademic = school['latest.cost.attendance.academic_year'];
  const coaProgram = school['latest.cost.attendance.program_year'];
  const coa = coaAcademic ?? coaProgram ?? null;
  const isInState = homeState !== '' && school['school.state'] === homeState;

  if (coa !== null && coa !== undefined) {
    if (!isPublic) return { value: coa, label: 'Private', isTuitionOnly: false };
    return { value: coa, label: isInState ? 'In-State' : (homeState ? 'Out-of-State' : ''), isTuitionOnly: false };
  }

  // Fallback to tuition when COA not available
  if (!isPublic) {
    return { value: school['latest.cost.tuition.out_of_state'], label: 'Private', isTuitionOnly: true };
  }
  if (isInState) {
    return { value: school['latest.cost.tuition.in_state'], label: 'In-State', isTuitionOnly: true };
  }
  const tuition = homeState ? school['latest.cost.tuition.out_of_state'] : school['latest.cost.tuition.in_state'];
  return { value: tuition, label: homeState ? 'Out-of-State' : '', isTuitionOnly: true };
}
