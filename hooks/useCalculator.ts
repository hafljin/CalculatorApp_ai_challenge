import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { CalculatorState, CalculationHistoryItem, CalculatorOperation } from '@/types/calculator';
import { performCalculation, formatNumber, isValidNumber, getOperatorSymbol } from '@/utils/calculator';

const HISTORY_STORAGE_KEY = 'calculator_history';

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
    error: null,
  });

  // Load history from storage on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Save history to storage whenever it changes
  useEffect(() => {
    saveHistory();
  }, [state.history]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        const history: CalculationHistoryItem[] = JSON.parse(storedHistory);
        setState(prev => ({ ...prev, history }));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const addToHistory = (expression: string, result: string) => {
    const historyItem: CalculationHistoryItem = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      history: [historyItem, ...prev.history.slice(0, 99)], // Keep only last 100 items
    }));
  };

  const clearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const inputNumber = useCallback((num: string) => {
    clearError();
    
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false,
        };
      }

      const newDisplay = prev.display === '0' ? num : prev.display + num;
      
      // Limit display length
      if (newDisplay.length > 12) {
        return prev;
      }

      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    clearError();
    
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0.',
          waitingForNewValue: false,
        };
      }

      if (prev.display.includes('.')) {
        return prev;
      }

      return {
        ...prev,
        display: prev.display + '.',
      };
    });
  }, []);

  const inputOperation = useCallback((operation: CalculatorOperation) => {
    clearError();
    
    setState(prev => {
      const currentValue = parseFloat(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          operation,
          waitingForNewValue: true,
        };
      }

      if (prev.operation && !prev.waitingForNewValue) {
        try {
          const result = performCalculation(prev.previousValue, currentValue, prev.operation);
          const formattedResult = formatNumber(result);

          return {
            ...prev,
            display: formattedResult,
            previousValue: result,
            operation,
            waitingForNewValue: true,
          };
        } catch (error) {
          return {
            ...prev,
            error: error instanceof Error ? error.message : 'Error',
            operation,
            waitingForNewValue: true,
          };
        }
      }

      return {
        ...prev,
        operation,
        waitingForNewValue: true,
      };
    });
  }, []);

  const calculate = useCallback(() => {
    clearError();
    
    setState(prev => {
      if (prev.operation && prev.previousValue !== null) {
        const currentValue = parseFloat(prev.display);
        
        try {
          const result = performCalculation(prev.previousValue, currentValue, prev.operation);
          const formattedResult = formatNumber(result);
          
          // Create expression string for history
          const expression = `${prev.previousValue} ${prev.operation} ${currentValue}`;
          
          // Add to history
          addToHistory(expression, formattedResult);

          return {
            ...prev,
            display: formattedResult,
            previousValue: null,
            operation: null,
            waitingForNewValue: true,
          };
        } catch (error) {
          return {
            ...prev,
            error: error instanceof Error ? error.message : 'Error',
            previousValue: null,
            operation: null,
            waitingForNewValue: true,
          };
        }
      }

      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      history: state.history,
      error: null,
    });
  }, [state.history]);

  const backspace = useCallback(() => {
    clearError();
    
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0',
          waitingForNewValue: false,
        };
      }

      const newDisplay = prev.display.slice(0, -1);
      return {
        ...prev,
        display: newDisplay === '' ? '0' : newDisplay,
      };
    });
  }, []);

  const toggleSign = useCallback(() => {
    clearError();
    
    setState(prev => {
      if (prev.waitingForNewValue) {
        return prev;
      }

      const currentValue = parseFloat(prev.display);
      const newValue = -currentValue;
      const formattedValue = formatNumber(newValue);

      return {
        ...prev,
        display: formattedValue,
      };
    });
  }, []);

  const percentage = useCallback(() => {
    clearError();
    
    setState(prev => {
      if (prev.waitingForNewValue) {
        return prev;
      }

      const currentValue = parseFloat(prev.display);
      const newValue = currentValue / 100;
      const formattedValue = formatNumber(newValue);

      return {
        ...prev,
        display: formattedValue,
      };
    });
  }, []);

  // Keyboard input handler
  const handleKeyPress = useCallback((key: string) => {
    if (/[0-9]/.test(key)) {
      inputNumber(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
      inputOperation(getOperatorSymbol(key));
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      backspace();
    }
  }, [inputNumber, inputDecimal, inputOperation, calculate, clear, backspace]);

  // Set up keyboard listeners for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        handleKeyPress(event.key);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyPress]);

  return {
    state,
    actions: {
      inputNumber,
      inputDecimal,
      inputOperation,
      calculate,
      clear,
      backspace,
      toggleSign,
      percentage,
      clearHistory,
    },
  };
};