import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function Splash({ navigation }: SplashProps): JSX.Element {
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const ref = useRef<LottieView>(null);

  const goToHome = useCallback(() => {
    if (timerID) {
      clearTimeout(timerID);
    }

    navigation.dispatch(StackActions.replace('Home'));
  }, [navigation, timerID]);

  useEffect(() => {
    const newTimerID = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Home'));
    }, 4000);

    setTimerID(newTimerID);
  }, [navigation]);

  useEffect(() => {
    if (ref.current) {
      ref.current.play();
    }
  }, []);

  return (
    <LottieView
      style={{
        flex: 1,
      }}
      ref={ref}
      source={require('../../assets/splash.json')}
      speed={0.8}
      loop={false}
      onAnimationFinish={goToHome}
    />
  );
}
