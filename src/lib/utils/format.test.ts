import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber, formatPercentage } from './format';

describe('formatCurrency', () => {
  it('should format positive numbers as currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('should format negative numbers as currency', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
});

describe('formatNumber', () => {
  it('should format numbers with specified decimals', () => {
    expect(formatNumber(1234.5678, 2)).toBe('1,234.57');
    expect(formatNumber(1234.5678, 0)).toBe('1,235');
    expect(formatNumber(1234.5678, 4)).toBe('1,234.5678');
  });

  it('should use default 2 decimals', () => {
    expect(formatNumber(1234.5678)).toBe('1,234.57');
  });
});

describe('formatPercentage', () => {
  it('should format numbers as percentages', () => {
    expect(formatPercentage(50)).toBe('50.00%');
    expect(formatPercentage(0)).toBe('0.00%');
    expect(formatPercentage(100)).toBe('100.00%');
    expect(formatPercentage(12.5)).toBe('12.50%');
  });
});
