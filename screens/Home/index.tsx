import { useState } from 'react';
import { View } from 'react-native';
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
