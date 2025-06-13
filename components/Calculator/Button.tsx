import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Animated, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'function' | 'equals';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ title, onPress, type = 'number', style, textStyle }: ButtonProps) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonColors = (): readonly [ColorValue, ColorValue] => {
    switch (type) {
      case 'operator':
        return ['#FF9500', '#FF8000'] as const;
      case 'function':
        return ['#A5A5A5', '#8E8E93'] as const;
      case 'equals':
        return ['#FF9500', '#FF8000'] as const;
      default:
        return ['#333333', '#2C2C2E'] as const;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'function':
        return '#000000'; // Black for function buttons
      default:
        return '#FFFFFF'; // White for others
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], flex: 1 }}>
      <TouchableOpacity
        style={[
          styles.button,
          style,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={getButtonColors()}
          style={styles.gradient}
        >
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1, 
    aspectRatio: 1, 
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: '500',
  },
});