import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import { CalculatorOperation } from '@/types/calculator';

interface KeypadProps {
  onNumberPress: (num: string) => void;
  onOperatorPress: (operator: CalculatorOperation) => void;
  onEqualsPress: () => void;
  onClearPress: () => void;
  onBackspacePress: () => void;
  onDecimalPress: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
}

interface ButtonDefinition {
  value: string;
  type: 'number' | 'operator' | 'function' | 'equals';
  action: () => void;
  wide?: boolean;
}

export default function Keypad({
  onNumberPress,
  onOperatorPress,
  onEqualsPress,
  onClearPress,
  onBackspacePress,
  onDecimalPress,
  onToggleSign,
  onPercentage,
}: KeypadProps) {
  const buttonLayout: ButtonDefinition[][] = [
    [
      { value: 'AC', type: 'function', action: onClearPress },
      { value: '±', type: 'function', action: onToggleSign },
      { value: '%', type: 'function', action: onPercentage },
      { value: '÷', type: 'operator', action: () => onOperatorPress('÷') },
    ],
    [
      { value: '7', type: 'number', action: () => onNumberPress('7') },
      { value: '8', type: 'number', action: () => onNumberPress('8') },
      { value: '9', type: 'number', action: () => onNumberPress('9') },
      { value: '×', type: 'operator', action: () => onOperatorPress('×') },
    ],
    [
      { value: '4', type: 'number', action: () => onNumberPress('4') },
      { value: '5', type: 'number', action: () => onNumberPress('5') },
      { value: '6', type: 'number', action: () => onNumberPress('6') },
      { value: '−', type: 'operator', action: () => onOperatorPress('-') },
    ],
    [
      { value: '1', type: 'number', action: () => onNumberPress('1') },
      { value: '2', type: 'number', action: () => onNumberPress('2') },
      { value: '3', type: 'number', action: () => onNumberPress('3') },
      { value: '+', type: 'operator', action: () => onOperatorPress('+') },
    ],
    [
      { value: '0', type: 'number', action: () => onNumberPress('0'), wide: true },
      { value: '.', type: 'number', action: onDecimalPress },
      { value: '=', type: 'equals', action: onEqualsPress },
    ],
  ];

  return (
    <View style={styles.container}>
      {buttonLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button, colIndex) => (
            <View 
              key={button.value} 
              style={[
                styles.buttonContainer,
                button.wide && styles.wideButtonContainer,
              ]}
            >
              <Button
                title={button.value}
                onPress={button.action}
                type={button.type}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'center', 
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  wideButtonContainer: {
    flex: 2,
  },
});