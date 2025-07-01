import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface DisplayProps {
  value: string;
  error?: string | null;
  style?: ViewStyle;
}

export default function Display({ value, error, style }: DisplayProps) {
  return (
    <View style={[styles.container, style]}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.display} numberOfLines={2} adjustsFontSizeToFit>
          {value}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  display: {
    fontSize: 36,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'right',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  error: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'right',
    fontWeight: '500',
  },
});