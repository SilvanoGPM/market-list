import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface DefaultGradientProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function DefaultGradient({ style, children }: DefaultGradientProps) {
  const { colors } = useTheme();

  const gradientOptions = {
    colors: [colors.accent, colors.primary],
    start: { x: -1, y: 0 },
    end: { x: 1, y: 0 },
  };

  return (
    <LinearGradient
      {...gradientOptions}
      style={[{ backgroundColor: colors.primary, }, style]}
    >
      {children}
    </LinearGradient>
  );
}
