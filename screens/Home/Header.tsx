import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Svg, { Polygon } from 'react-native-svg';
import styles from './styles';

function AngledShape() {
  return (
    <View style={{ height: 50 }}>
      <Svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <Polygon fill="#ffffff" points="0,100 100,0 100,100" />
      </Svg>
    </View>
  );
}

export function Header() {
  const { colors } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.primary }, styles.header]}>
      <View style={[{ backgroundColor: colors.primary }, styles.fixBackground]} />

      <View style={styles.headerTitleContainer}>
        <Title style={styles.headerTitle}>Market{'\n'}List</Title>
      </View>

      <AngledShape />
    </View>
  );
}
