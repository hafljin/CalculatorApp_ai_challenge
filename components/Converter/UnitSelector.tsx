import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Unit } from '@/types/converter';
import { UNITS } from '@/utils/converter';

interface UnitSelectorProps {
  category: string;
  selectedUnit: string;
  onUnitSelect: (unitId: string) => void;
  title: string;
}

export default function UnitSelector({ category, selectedUnit, onUnitSelect, title }: UnitSelectorProps) {
  const units = UNITS[category as keyof typeof UNITS] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {units.map((unit: Unit) => (
          <TouchableOpacity
            key={unit.id}
            style={[
              styles.unitButton,
              selectedUnit === unit.id && styles.selectedUnitButton,
            ]}
            onPress={() => onUnitSelect(unit.id)}
          >
            <Text
              style={[
                styles.unitText,
                selectedUnit === unit.id && styles.selectedUnitText,
              ]}
            >
              {unit.name}
            </Text>
            <Text
              style={[
                styles.unitSymbol,
                selectedUnit === unit.id && styles.selectedUnitSymbol,
              ]}
            >
              {unit.symbol}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    minWidth: 80,
  },
  selectedUnitButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedUnitText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  unitSymbol: {
    fontSize: 10,
    color: '#D1D5DB',
    marginTop: 2,
    textAlign: 'center',
  },
  selectedUnitSymbol: {
    color: '#FFFFFF',
  },
}); 