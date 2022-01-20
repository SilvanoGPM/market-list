import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Svg, { Polygon } from 'react-native-svg';

import styles from './styles';

interface AngledShapeProps {
  color: string;
}

function AngledShape({ color }: AngledShapeProps) {
  return (
    <View style={{ height: 50 }}>
      <Svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <Polygon fill={color} points="0,100 100,0 100,100" />
      </Svg>
    </View>
  );
}

export function Header() {
  const { colors } = useTheme();

  const gradientOptions = {
    colors: [colors.accent, colors.primary],
    start: { x: -1, y: 0 },
    end: { x: 1, y: 0 },
  };

  return (
    <LinearGradient {...gradientOptions} style={styles.header}>
      <LinearGradient
        {...gradientOptions}
        style={[{ backgroundColor: colors.primary }, styles.fixBackground]}
      />

      <View style={styles.headerTitleContainer}>
        <Title style={[{ color: colors.background }, styles.headerTitle]}>
          Market{'\n'}List
        </Title>
      </View>

      <AngledShape color={colors.background} />
    </LinearGradient>
  );
}
