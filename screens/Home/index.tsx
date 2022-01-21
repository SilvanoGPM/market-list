import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from './Header';
import { PurchasesList } from './PurchasesList';
import { PurchasesInfo } from './PurchasesInfo';

import styles from './styles';
import { usePurchases } from '../../contexts/PurchaseContext';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: HomeProps) {
  const { purchases } = usePurchases();

  const { colors } = useTheme();

  useEffect(() => {
    function handleGoBack() {
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
  }, []);

  function goToNewPurchase() {
    navigation.navigate('NewPurchase');
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <PurchasesList purchases={purchases} />

      <PurchasesInfo purchases={purchases} />

      <View style={styles.fabContainer}>
        <FAB
          style={[{ backgroundColor: colors.primary }, styles.fab]}
          icon="plus"
          onPress={goToNewPurchase}
        />
      </View>
    </View>
  );
}
