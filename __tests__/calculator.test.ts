import { performCalculation, formatNumber, isValidNumber } from '../utils/calculator';

describe('Calculator Logic Tests', () => {
  describe('Basic Operations', () => {
    test('should add two numbers correctly', () => {
      expect(performCalculation(5, 3, '+')).toBe(8);
      expect(performCalculation(10, 20, '+')).toBe(30);
      expect(performCalculation(-5, 3, '+')).toBe(-2);
    });

    test('should subtract two numbers correctly', () => {
      expect(performCalculation(10, 3, '-')).toBe(7);
      expect(performCalculation(5, 10, '-')).toBe(-5);
      expect(performCalculation(0, 5, '-')).toBe(-5);
    });

    test('should multiply two numbers correctly', () => {
      expect(performCalculation(5, 3, '×')).toBe(15);
      expect(performCalculation(10, 0, '×')).toBe(0);
      expect(performCalculation(-5, 3, '×')).toBe(-15);
    });

    test('should divide two numbers correctly', () => {
      expect(performCalculation(10, 2, '÷')).toBe(5);
      expect(performCalculation(15, 3, '÷')).toBe(5);
      expect(performCalculation(0, 5, '÷')).toBe(0);
    });

    test('should handle division by zero', () => {
      expect(() => performCalculation(10, 0, '÷')).toThrow('Cannot divide by zero');
    });
  });

  describe('Number Formatting', () => {
    test('should format numbers correctly', () => {
      expect(formatNumber(123.456)).toBe('123.456');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-123.456)).toBe('-123.456');
    });

    test('should format large numbers with exponential notation', () => {
      const largeNumber = 1234567890123;
      expect(formatNumber(largeNumber)).toMatch(/1\.234568e\+12/);
    });
  });

  describe('Input Validation', () => {
    test('should validate numbers correctly', () => {
      expect(isValidNumber('123')).toBe(true);
      expect(isValidNumber('123.456')).toBe(true);
      expect(isValidNumber('-123')).toBe(true);
      expect(isValidNumber('0')).toBe(true);
      expect(isValidNumber('abc')).toBe(false);
      expect(isValidNumber('')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should handle large numbers', () => {
      expect(performCalculation(999999, 1, '+')).toBe(1000000);
      expect(performCalculation(999999, 999999, '×')).toBe(999998000001);
    });

    test('should handle decimal numbers', () => {
      expect(performCalculation(3.5, 2.5, '+')).toBe(6);
      expect(performCalculation(10.5, 2, '÷')).toBe(5.25);
    });

    test('should handle zero operations', () => {
      expect(performCalculation(0, 0, '+')).toBe(0);
      expect(performCalculation(0, 0, '×')).toBe(0);
    });
  });
}); 