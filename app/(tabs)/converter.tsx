import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useConverter } from '@/hooks/useConverter';
import CategorySelector from '@/components/Converter/CategorySelector';
import UnitSelector from '@/components/Converter/UnitSelector';

export default function ConverterScreen() {
  const { state, history, actions } = useConverter();

  const handleClearHistory = () => {
    Alert.alert(
      '履歴をクリア',
      'すべての変換履歴を削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: actions.clearHistory },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#111827', '#1F2937', '#374151']}
      style={styles.gradient}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>単位変換</Text>
          
          {/* カテゴリ選択 */}
          <CategorySelector
            selectedCategory={state.category}
            onCategorySelect={actions.setCategory}
          />
          
          {/* 入力単位選択 */}
          <UnitSelector
            category={state.category}
            selectedUnit={state.fromUnit}
            onUnitSelect={actions.setFromUnit}
            title="変換元"
          />
          
          {/* 出力単位選択 */}
          <UnitSelector
            category={state.category}
            selectedUnit={state.toUnit}
            onUnitSelect={actions.setToUnit}
            title="変換先"
          />
          
          {/* 入力フィールド */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>入力値</Text>
            <TextInput
              style={styles.input}
              value={state.inputValue}
              onChangeText={actions.setInputValue}
              placeholder="数値を入力"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              autoCorrect={false}
            />
          </View>
          
          {/* エラーメッセージ */}
          {state.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.error}</Text>
            </View>
          )}
          
          {/* 結果表示 */}
          {state.outputValue && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>結果</Text>
              <Text style={styles.resultValue}>{state.outputValue}</Text>
            </View>
          )}
          
          {/* 操作ボタン */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={actions.swapUnits}>
              <Text style={styles.buttonText}>⇄ 入れ替え</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={actions.clearAll}>
              <Text style={styles.buttonText}>クリア</Text>
            </TouchableOpacity>
          </View>
          
          {/* 履歴 */}
          {history.length > 0 && (
            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>変換履歴</Text>
                <TouchableOpacity onPress={handleClearHistory}>
                  <Text style={styles.clearHistoryText}>クリア</Text>
                </TouchableOpacity>
              </View>
              
              {history.slice(0, 5).map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <Text style={styles.historyText}>
                    {item.inputValue} → {item.outputValue}
                  </Text>
                  <Text style={styles.historyCategory}>
                    {item.category} ({item.fromUnit} → {item.toUnit})
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  errorContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  resultContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  resultValue: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: '#10B981',
    borderWidth: 1,
    borderColor: '#10B981',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    paddingHorizontal: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  clearHistoryText: {
    color: '#EF4444',
    fontSize: 14,
  },
  historyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  historyCategory: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
}); 