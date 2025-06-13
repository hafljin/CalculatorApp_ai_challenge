import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConverterState, ConversionCategory, ConversionHistoryItem } from '@/types/converter';
import { convertUnit, validateInput, formatNumber, UNITS, getCategoryName } from '@/utils/converter';

const CONVERSION_HISTORY_STORAGE_KEY = 'conversion_history';

export const useConverter = () => {
  const [state, setState] = useState<ConverterState>({
    category: 'length',
    fromUnit: 'meter',
    toUnit: 'kilometer',
    inputValue: '',
    outputValue: '',
    error: null,
  });

  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  // 履歴を読み込み
  useEffect(() => {
    loadHistory();
  }, []);

  // 履歴を保存
  useEffect(() => {
    saveHistory();
  }, [history]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(CONVERSION_HISTORY_STORAGE_KEY);
      if (storedHistory) {
        const historyData: ConversionHistoryItem[] = JSON.parse(storedHistory);
        setHistory(historyData);
      }
    } catch (error) {
      console.error('履歴の読み込みに失敗しました:', error);
    }
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem(CONVERSION_HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('履歴の保存に失敗しました:', error);
    }
  };

  const addToHistory = (inputValue: string, outputValue: string) => {
    const historyItem: ConversionHistoryItem = {
      id: Date.now().toString(),
      category: state.category,
      fromUnit: state.fromUnit,
      toUnit: state.toUnit,
      inputValue,
      outputValue,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev: ConversionHistoryItem[]) => [historyItem, ...prev.slice(0, 99)]); // 最新100件を保持
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const clearError = () => {
    setState((prev: ConverterState) => ({ ...prev, error: null }));
  };

  const setCategory = useCallback((category: ConversionCategory) => {
    const units = UNITS[category];
    setState((prev: ConverterState) => ({
      ...prev,
      category,
      fromUnit: units[0].id,
      toUnit: units[1]?.id || units[0].id,
      inputValue: '',
      outputValue: '',
      error: null,
    }));
  }, []);

  const setFromUnit = useCallback((unitId: string) => {
    setState((prev: ConverterState) => ({
      ...prev,
      fromUnit: unitId,
      outputValue: '',
      error: null,
    }));
  }, []);

  const setToUnit = useCallback((unitId: string) => {
    setState((prev: ConverterState) => ({
      ...prev,
      toUnit: unitId,
      outputValue: '',
      error: null,
    }));
  }, []);

  const setInputValue = useCallback((value: string) => {
    clearError();
    
    if (!validateInput(value)) {
      setState((prev: ConverterState) => ({
        ...prev,
        inputValue: value,
        outputValue: '',
        error: '有効な数値を入力してください',
      }));
      return;
    }

    setState((prev: ConverterState) => ({
      ...prev,
      inputValue: value,
      outputValue: '',
      error: null,
    }));
  }, []);

  const performConversion = useCallback(() => {
    if (!state.inputValue || state.inputValue === '-' || state.inputValue === '.') {
      setState((prev: ConverterState) => ({
        ...prev,
        outputValue: '',
        error: null,
      }));
      return;
    }

    try {
      const inputNum = parseFloat(state.inputValue);
      const result = convertUnit(inputNum, state.fromUnit, state.toUnit);
      const formattedResult = formatNumber(result);
      
      setState((prev: ConverterState) => ({
        ...prev,
        outputValue: formattedResult,
        error: null,
      }));

      // 履歴に追加
      addToHistory(state.inputValue, formattedResult);
    } catch (error) {
      setState((prev: ConverterState) => ({
        ...prev,
        outputValue: '',
        error: error instanceof Error ? error.message : '変換エラーが発生しました',
      }));
    }
  }, [state.inputValue, state.fromUnit, state.toUnit]);

  // 入力値が変更されたときに自動変換
  useEffect(() => {
    performConversion();
  }, [state.inputValue, state.fromUnit, state.toUnit]);

  const swapUnits = useCallback(() => {
    setState((prev: ConverterState) => ({
      ...prev,
      fromUnit: prev.toUnit,
      toUnit: prev.fromUnit,
      inputValue: prev.outputValue,
      outputValue: '',
      error: null,
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState((prev: ConverterState) => ({
      ...prev,
      inputValue: '',
      outputValue: '',
      error: null,
    }));
  }, []);

  return {
    state,
    history,
    actions: {
      setCategory,
      setFromUnit,
      setToUnit,
      setInputValue,
      performConversion,
      swapUnits,
      clearAll,
      clearHistory,
    },
  };
}; 