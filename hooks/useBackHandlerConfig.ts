import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';

import { RootStackParamList } from '../@types/routes.types';

type UseBackHandlerConfig = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function useBackHandlerConfig(navigation: UseBackHandlerConfig): void {
  useEffect(() => {
    function handleGoBack(): boolean {
      if (!navigation.canGoBack()) {
        BackHandler.exitApp();
      } else {
        navigation.goBack();
        return true;
      }

      return false;
    }

    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    };
  }, [navigation]);
}
