import React from 'react';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AnimatedLottieView from 'lottie-react-native';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function Splash({ navigation }: SplashProps): JSX.Element {
  function goToHome(): void {
    navigation.dispatch(StackActions.replace('Home'));
  }

  return (
    <AnimatedLottieView
      source={require('../../assets/splash.json')}
      autoPlay
      speed={0.8}
      loop={false}
      onAnimationFinish={goToHome}
    />
  );
}
