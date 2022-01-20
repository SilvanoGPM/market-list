import { useState } from 'react';
import { View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { LatestPurchases } from './LatestPurchases';
import { Header } from './Header';

import styles from './styles';

export function Home() {
  const { colors } = useTheme();

  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', title: 'Compra N° 100', total: 34 },
    { id: '2', title: 'Compra N° 2', total: 25 },
    { id: '3', title: 'Compra N° 3', total: 50 },
    { id: '4', title: 'Compra N° 4000', total: 49 },
    { id: '5', title: 'Compra N° 3000', total: 49 },
    { id: '6', title: 'Compra N° 5000', total: 49 },
    { id: '7', title: 'Compra N° 6000', total: 49 },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <LatestPurchases purchases={purchases.reverse()} />

      <View style={styles.fabContainer}>
        <FAB
          style={[{ backgroundColor: colors.primary }, styles.fab]}
          icon="plus"
        />
      </View>
    </View>
  );
}
