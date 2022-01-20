import { useState } from 'react';
import { View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from './Header';
import { PurchasesList } from './PurchasesList';
import { PurchasesInfo } from './PurchasesInfo';

import styles from './styles';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: HomeProps) {
  const { colors } = useTheme();

  const [purchases, setPurchases] = useState<Purchase[]>([
    // { id: '1', title: 'Compra N° 100', total: 34, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '2', title: 'Compra N° 2', total: 25, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '3', title: 'Compra N° 3', total: 50, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '4', title: 'Compra N° 4000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '5', title: 'Compra N° 3000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '6', title: 'Compra N° 5000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
    // { id: '7', title: 'Compra N° 6000', total: 49, products: [{ name: 'Arroz', price: 3.7, quantity: 2 }] },
  ]);

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
