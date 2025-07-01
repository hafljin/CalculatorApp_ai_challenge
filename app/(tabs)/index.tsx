import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalculator } from '@/hooks/useCalculator';
import Display from '@/components/Calculator/Display';
import Keypad from '@/components/Calculator/Keypad';

export default function CalculatorScreen() {
  const { state, actions } = useCalculator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#111827', '#1F2937', '#374151']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Display value={state.display} error={state.error} />
          <View style={styles.keypadContainer}>
            <Keypad
              onNumberPress={actions.inputNumber}
              onOperatorPress={actions.inputOperation}
              onEqualsPress={actions.calculate}
              onClearPress={actions.clear}
              onBackspacePress={actions.backspace}
              onDecimalPress={actions.inputDecimal}
              onToggleSign={actions.toggleSign}
              onPercentage={actions.percentage}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#374151',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
  },
  keypadContainer: {
    flex: 1,
  },
});