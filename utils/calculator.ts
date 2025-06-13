import { CalculatorOperation } from '@/types/calculator';

export const performCalculation = (
  prevValue: number,
  nextValue: number,
  operation: CalculatorOperation
): number => {
  switch (operation) {
    case '+':
      return prevValue + nextValue;
    case '-':
      return prevValue - nextValue;
    case '×':
      return prevValue * nextValue;
    case '÷':
      if (nextValue === 0) {
        throw new Error('Cannot divide by zero');
      }
      return prevValue / nextValue;
    default:
      return nextValue;
  }
};

export const formatNumber = (num: number): string => {
  if (num.toString().length > 12) {
    return num.toExponential(6);
  }
  return num.toString();
};

export const isValidNumber = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};

export const getOperatorSymbol = (operation: string): CalculatorOperation => {
  switch (operation) {
    case '+':
    case 'Add':
      return '+';
    case '-':
    case 'Subtract':
      return '-';
    case '*':
    case 'Multiply':
      return '×';
    case '/':
    case 'Divide':
      return '÷';
    default:
      return '+';
  }
};