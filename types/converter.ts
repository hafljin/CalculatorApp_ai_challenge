export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  category: ConversionCategory;
}

export interface ConversionRate {
  fromUnit: string;
  toUnit: string;
  rate: number;
  offset?: number;
}

export interface ConverterState {
  category: ConversionCategory;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  outputValue: string;
  error: string | null;
}

export interface ConversionHistoryItem {
  id: string;
  category: ConversionCategory;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  outputValue: string;
  timestamp: string;
} 