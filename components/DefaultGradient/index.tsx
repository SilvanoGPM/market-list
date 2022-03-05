import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface DefaultGradientProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function DefaultGradient({
  style,
  children,
}: DefaultGradientProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={colors.gradient}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[{ backgroundColor: colors.primary }, style]}
    >
      {children}
    </LinearGradient>
  );
}
