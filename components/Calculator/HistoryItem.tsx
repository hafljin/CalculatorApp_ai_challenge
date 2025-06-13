import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CalculationHistoryItem } from '@/types/calculator';

interface HistoryItemProps {
  item: CalculationHistoryItem;
  onPress?: (item: CalculationHistoryItem) => void;
}

export default function HistoryItem({ item, onPress }: HistoryItemProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.expression}>{item.expression}</Text>
        <Text style={styles.result}>= {item.result}</Text>
      </View>
      <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    marginBottom: 8,
  },
  expression: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  result: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
});