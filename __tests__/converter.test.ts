import { convertUnit, validateInput, formatNumber } from '../utils/converter';

describe('Unit Converter Logic Tests', () => {
  describe('Length Conversions', () => {
    test('should convert meters to centimeters', () => {
      expect(convertUnit(1, 'm', 'cm')).toBe(100);
      expect(convertUnit(2.5, 'm', 'cm')).toBe(250);
    });

    test('should convert centimeters to meters', () => {
      expect(convertUnit(100, 'cm', 'm')).toBe(1);
      expect(convertUnit(250, 'cm', 'm')).toBe(2.5);
    });

    test('should convert kilometers to meters', () => {
      expect(convertUnit(1, 'km', 'm')).toBe(1000);
      expect(convertUnit(0.5, 'km', 'm')).toBe(500);
    });

    test('should convert inches to centimeters', () => {
      expect(convertUnit(1, 'inch', 'cm')).toBeCloseTo(2.54, 2);
      expect(convertUnit(10, 'inch', 'cm')).toBeCloseTo(25.4, 1);
    });
  });

  describe('Weight Conversions', () => {
    test('should convert kilograms to grams', () => {
      expect(convertUnit(1, 'kg', 'g')).toBe(1000);
      expect(convertUnit(2.5, 'kg', 'g')).toBe(2500);
    });

    test('should convert grams to kilograms', () => {
      expect(convertUnit(1000, 'g', 'kg')).toBe(1);
      expect(convertUnit(2500, 'g', 'kg')).toBe(2.5);
    });

    test('should convert pounds to kilograms', () => {
      expect(convertUnit(1, 'lb', 'kg')).toBeCloseTo(0.453592, 6);
      expect(convertUnit(10, 'lb', 'kg')).toBeCloseTo(4.53592, 5);
    });
  });

  describe('Temperature Conversions', () => {
    test('should convert Celsius to Fahrenheit', () => {
      expect(convertUnit(0, '°C', '°F')).toBe(32);
      expect(convertUnit(100, '°C', '°F')).toBe(212);
      expect(convertUnit(25, '°C', '°F')).toBe(77);
    });

    test('should convert Fahrenheit to Celsius', () => {
      expect(convertUnit(32, '°F', '°C')).toBe(0);
      expect(convertUnit(212, '°F', '°C')).toBe(100);
      expect(convertUnit(77, '°F', '°C')).toBe(25);
    });

    test('should convert Celsius to Kelvin', () => {
      expect(convertUnit(0, '°C', 'K')).toBe(273.15);
      expect(convertUnit(100, '°C', 'K')).toBe(373.15);
    });

    test('should convert Kelvin to Celsius', () => {
      expect(convertUnit(273.15, 'K', '°C')).toBe(0);
      expect(convertUnit(373.15, 'K', '°C')).toBe(100);
    });
  });

  describe('Input Validation', () => {
    test('should validate numeric input', () => {
      expect(validateInput('123')).toBe(true);
      expect(validateInput('123.456')).toBe(true);
      expect(validateInput('-123')).toBe(true);
      expect(validateInput('0')).toBe(true);
      expect(validateInput('abc')).toBe(false);
      expect(validateInput('')).toBe(false);
    });
  });

  describe('Number Formatting', () => {
    test('should format numbers correctly', () => {
      expect(formatNumber(123.456)).toBe('123.456');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-123.456)).toBe('-123.456');
    });

    test('should handle very small numbers', () => {
      expect(formatNumber(0.000001)).toBe('0.000001');
    });

    test('should handle very large numbers', () => {
      const largeNumber = 1234567890123;
      expect(formatNumber(largeNumber)).toMatch(/1\.234568e\+12/);
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero values', () => {
      expect(convertUnit(0, 'm', 'cm')).toBe(0);
      expect(convertUnit(0, 'kg', 'g')).toBe(0);
      expect(convertUnit(0, '°C', '°F')).toBe(32);
    });

    test('should handle negative values', () => {
      expect(convertUnit(-10, '°C', '°F')).toBe(14);
      expect(convertUnit(-5, 'm', 'cm')).toBe(-500);
    });

    test('should handle same unit conversion', () => {
      expect(convertUnit(100, 'm', 'm')).toBe(100);
      expect(convertUnit(50, 'kg', 'kg')).toBe(50);
    });
  });
}); 