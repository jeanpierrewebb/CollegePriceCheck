import { ANNUAL_INCREASE_RATE, FEDERAL_LOAN_RATE, STANDARD_REPAYMENT_YEARS, FPL_2024, IDR_INCOME_PERCENT, IDR_FPL_MULTIPLIER } from './constants';

export interface FourYearProjection {
  years: number[];
  total: number;
}

export function projectFourYearCost(yearOnePrice: number | null): FourYearProjection | null {
  if (yearOnePrice === null || yearOnePrice === undefined) return null;

  const years = [
    yearOnePrice,
    Math.round(yearOnePrice * (1 + ANNUAL_INCREASE_RATE)),
    Math.round(yearOnePrice * Math.pow(1 + ANNUAL_INCREASE_RATE, 2)),
    Math.round(yearOnePrice * Math.pow(1 + ANNUAL_INCREASE_RATE, 3)),
  ];

  return {
    years,
    total: years.reduce((sum, y) => sum + y, 0),
  };
}

export function calculateMonthlyPayment(principal: number): number {
  const monthlyRate = FEDERAL_LOAN_RATE / 12;
  const numPayments = STANDARD_REPAYMENT_YEARS * 12;
  return Math.round(
    principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateIDR(annualIncome: number): number {
  const discretionaryIncome = Math.max(0, annualIncome - (IDR_FPL_MULTIPLIER * FPL_2024));
  return Math.round((IDR_INCOME_PERCENT * discretionaryIncome) / 12);
}

export function calculateTotalRepaid(monthlyPayment: number): number {
  return monthlyPayment * STANDARD_REPAYMENT_YEARS * 12;
}
