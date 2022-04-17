import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { Button, useTheme } from 'react-native-paper';

import { RootStackParamList } from '../../@types/routes.types';

import splash from '../../assets/splash.json';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function Splash({ navigation }: SplashProps): JSX.Element {
  const { colors } = useTheme();

  const [timerID, setTimerID] = useState<NodeJS.Timeout>();

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        style={{
          flex: 1,
        }}
        autoSize
        autoPlay
        resizeMode="contain"
        source={splash}
        speed={0.8}
        loop
      />

      <Button
        onPress={goToHome}
        style={{ marginBottom: '30%', width: '80%' }}
        labelStyle={{ color: colors.icon }}
        mode="contained"
      >
        Pular
      </Button>
    </View>
  );
}
