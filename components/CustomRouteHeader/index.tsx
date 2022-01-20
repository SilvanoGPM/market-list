import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Title, useTheme } from 'react-native-paper';

import { DefaultGradient } from '../DefaultGradient';
import styles from './styles';

export function CustomRouteHeader({
  navigation,
  options,
}: NativeStackHeaderProps) {
  const { colors } = useTheme();

  function goBack() {
    navigation.goBack();
  }

  return (
    <DefaultGradient style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Avatar.Icon
          size={35}
          icon="keyboard-backspace"
          style={{ backgroundColor: colors.background }}
        />
      </TouchableOpacity>

      <Title style={[{ color: colors.background }, styles.title]}>
        {options.headerTitle}
      </Title>
    </DefaultGradient>
  );
}
