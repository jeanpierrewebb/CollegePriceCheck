/**
 * Simplified SAI (Student Aid Index) Calculator
 * 
 * This is an ESTIMATE only. The official SAI is calculated by the FAFSA.
 * Based on simplified federal methodology for 2024-25.
 * 
 * Key factors:
 * - Income (Adjusted Gross Income) - primary driver
 * - Assets (savings, investments - NOT retirement or primary home equity for FAFSA)
 * - Number of children in college - SAI is divided
 * - Family size affects income protection allowance
 */

import { FamilyProfile, INCOME_BRACKETS, SAVINGS_OPTIONS } from './types';

// Income midpoints for each bracket (for calculation)
const INCOME_MIDPOINTS: Record<string, number> = {
  '0-30000': 15000,
  '30001-48000': 39000,
  '48001-75000': 61500,
  '75001-110000': 92500,
  '110001-plus': 150000, // Estimate for upper bracket
};

// Asset midpoints
const ASSET_MIDPOINTS: Record<string, number> = {
  '': 0,
  'under-25k': 12500,
  '25k-50k': 37500,
  '50k-100k': 75000,
  '100k-250k': 175000,
  'over-250k': 350000,
  'prefer-not': 0, // Assume 0 if not disclosed
};

// 529 midpoints
const BALANCE_529_MIDPOINTS: Record<string, number> = {
  '': 0,
  'none': 0,
  'under-25k': 12500,
  '25k-50k': 37500,
  '50k-100k': 75000,
  'over-100k': 150000,
  'prefer-not': 0,
};

// Income protection allowance based on family size (simplified)
// These are approximations of the federal allowances
const INCOME_PROTECTION: Record<number, number> = {
  1: 12000, // Single
  2: 20000, // Married, no dependents
  3: 25000, // 1 child
  4: 30000, // 2 children
  5: 35000, // 3 children
  6: 40000, // 4+ children
};

export interface SAIResult {
  estimatedSAI: number;
  explanation: string;
  needLevel: 'high' | 'medium' | 'low' | 'none';
  disclaimer: string;
}

export function calculateSAI(profile: FamilyProfile): SAIResult {
  // Get income midpoint
  const income = INCOME_MIDPOINTS[profile.householdIncome] || 61500;
  
  // Get assets
  const savings = ASSET_MIDPOINTS[profile.savingsInvestments] || 0;
  const balance529 = BALANCE_529_MIDPOINTS[profile.balance529] || 0;
  // Note: Home equity is NOT included in FAFSA SAI (only CSS Profile)
  const totalAssets = savings + balance529;
  
  // Determine family size for income protection
  // Simplified: married + children = family size
  let familySize = profile.maritalStatus === 'married' ? 2 : 1;
  familySize += profile.childrenInCollege; // At minimum, the children going to college
  
  // Get income protection allowance
  const incomeProtection = INCOME_PROTECTION[Math.min(familySize, 6)] || 25000;
  
  // Calculate available income (simplified)
  const availableIncome = Math.max(0, income - incomeProtection);
  
  // Income contribution: ~22-47% of available income above protection
  // Using a simplified progressive rate
  let incomeContribution = 0;
  if (availableIncome <= 20000) {
    incomeContribution = availableIncome * 0.22;
  } else if (availableIncome <= 50000) {
    incomeContribution = 4400 + (availableIncome - 20000) * 0.25;
  } else if (availableIncome <= 100000) {
    incomeContribution = 11900 + (availableIncome - 50000) * 0.35;
  } else {
    incomeContribution = 29400 + (availableIncome - 100000) * 0.47;
  }
  
  // Asset contribution: ~5.64% of assets above asset protection allowance (~$10k)
  const assetProtection = 10000; // Simplified
  const assetContribution = Math.max(0, (totalAssets - assetProtection) * 0.0564);
  
  // Total parent contribution
  let parentContribution = incomeContribution + assetContribution;
  
  // Divide by number of children in college
  const childrenInCollege = profile.childrenInCollege || 1;
  let sai = Math.round(parentContribution / childrenInCollege);
  
  // SAI can be negative (minimum -1500 in new formula)
  sai = Math.max(-1500, sai);
  
  // Determine need level and explanation
  let needLevel: 'high' | 'medium' | 'low' | 'none';
  let explanation: string;
  
  if (sai < 0) {
    needLevel = 'high';
    explanation = 'Your negative SAI indicates maximum need-based aid eligibility. You may qualify for Pell Grant and substantial institutional aid.';
  } else if (sai < 10000) {
    needLevel = 'high';
    explanation = 'Your low SAI indicates high need-based aid eligibility. You likely qualify for Pell Grant and significant need-based institutional aid.';
  } else if (sai < 30000) {
    needLevel = 'medium';
    explanation = 'Your moderate SAI indicates some need-based aid eligibility. You may qualify for need-based grants at many schools.';
  } else if (sai < 60000) {
    needLevel = 'low';
    explanation = 'Your SAI suggests limited need-based aid at most schools. Focus on merit scholarships and schools with strong financial aid.';
  } else {
    needLevel = 'none';
    explanation = 'Your SAI suggests you\'re unlikely to qualify for need-based aid. Look into merit scholarships and payment plans.';
  }
  
  return {
    estimatedSAI: sai,
    explanation,
    needLevel,
    disclaimer: 'This is an estimate only. Your actual SAI will be calculated when you file the FAFSA. Many factors may affect your final number.',
  };
}

export function formatSAI(sai: number): string {
  if (sai < 0) {
    return `-$${Math.abs(sai).toLocaleString()}`;
  }
  return `$${sai.toLocaleString()}`;
}
