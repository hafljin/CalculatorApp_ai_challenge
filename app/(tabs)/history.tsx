import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2 } from 'lucide-react-native';
import { useCalculator } from '@/hooks/useCalculator';
import HistoryItem from '@/components/Calculator/HistoryItem';
import { CalculationHistoryItem } from '@/types/calculator';

export default function HistoryScreen() {
  const { state, actions } = useCalculator();

  const renderHistoryItem = ({ item }: { item: CalculationHistoryItem }) => (
    <HistoryItem item={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>計算履歴がありません</Text>
      <Text style={styles.emptySubtext}>
        計算を開始すると、ここに履歴が表示されます
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937', '#374151']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>計算履歴</Text>
          {state.history.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={actions.clearHistory}
              activeOpacity={0.7}
            >
              <Trash2 size={20} color="#EF4444" />
              <Text style={styles.clearText}>クリア</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={state.history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  clearText: {
    color: '#EF4444',
    marginLeft: 6,
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});