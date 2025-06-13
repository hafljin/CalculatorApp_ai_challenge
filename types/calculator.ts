export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

export type CalculatorOperation = '+' | '-' | '×' | '÷';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: CalculatorOperation | null;
  waitingForNewValue: boolean;
  history: CalculationHistoryItem[];
  error: string | null;
}