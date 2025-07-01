import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Unit } from '@/types/converter';
import { UNITS } from '@/utils/converter';

interface UnitSelectorProps {
  category: string;
  selectedUnit: string;
  onUnitSelect: (unitId: string) => void;
  title: string;
}

export default function UnitSelector({ category, selectedUnit, onUnitSelect, title }: UnitSelectorProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const units = UNITS[category as keyof typeof UNITS] || [];

  const selectedUnitData = units.find(unit => unit.id === selectedUnit);

  const handleSelect = (unitId: string) => {
    onUnitSelect(unitId);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.pickerContent}>
          <Text style={styles.pickerText}>{selectedUnitData?.name || '選択してください'}</Text>
          <Text style={styles.pickerSymbol}>{selectedUnitData?.symbol || ''}</Text>
        </View>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}を選択</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={units}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedUnit === item.id && styles.selectedOptionItem,
                  ]}
                  onPress={() => handleSelect(item.id)}
                >
                  <View style={styles.optionContent}>
                    <Text
                      style={[
                        styles.optionText,
                        selectedUnit === item.id && styles.selectedOptionText,
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.optionSymbol,
                        selectedUnit === item.id && styles.selectedOptionSymbol,
                      ]}
                    >
                      {item.symbol}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pickerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContent: {
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  pickerSymbol: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  arrow: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    fontSize: 20,
    color: '#9CA3AF',
    padding: 5,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedOptionItem: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  selectedOptionText: {
    color: '#10B981',
    fontWeight: '600',
  },
  optionSymbol: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  selectedOptionSymbol: {
    color: '#10B981',
  },
}); 