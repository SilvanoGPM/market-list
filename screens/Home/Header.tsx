import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Animated } from 'react-native';
import { IconButton, Title, useTheme } from 'react-native-paper';
import Svg, { Polygon } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useBackInAnimation } from '../../hooks/useBackInAnimation';
import { RootStackParamList } from '../../@types/routes.types';

import styles from './styles';

interface AngledShapeProps {
  color: string;
}

function AngledShape({ color }: AngledShapeProps): JSX.Element {
  return (
    <View style={{ height: 50 }}>
      <Svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <Polygon fill={color} points="0,100 100,0 100,100" />
      </Svg>
    </View>
  );
}

export function Header(): JSX.Element {
  const { colors } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const animationStyle = useBackInAnimation({
    direction: 'top',
  });

  function goToSettings(): void {
    navigation.navigate('Settings');
  }

  return (
    <LinearGradient
      colors={colors.gradient}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Animated.View style={[animationStyle, styles.headerTitleContainer]}>
        <Title style={[{ color: colors.background }, styles.headerTitle]}>
          Market{'\n'}List
        </Title>

        <IconButton
          onPress={goToSettings}
          icon="cog-outline"
          size={40}
          color={colors.background}
          style={styles.cog}
        />
      </Animated.View>

      <AngledShape color={colors.background} />
    </LinearGradient>
  );
}
