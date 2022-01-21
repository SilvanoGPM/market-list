import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Headline, Paragraph, Title, useTheme } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import { usePurchases } from '../../contexts/PurchaseContext';
import { formatTotal } from '../../utils/formatters';
import { sum } from '../../utils/sum';
import { sumProducts } from '../../utils/sumProducts';
import { ListProducts } from './ListProducts';

import styles from './styles';

type ViewPurchaseProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPurchase'
>;

export function ViewPurchase({ navigation, route }: ViewPurchaseProps) {
  const { purchases } = usePurchases();
  const toaster = useToast();

  const purchase = purchases.find(({ id }) => id === route.params.id);

  if (!purchase) {
    navigation.goBack();
    toaster.show({
      message: 'Essa compra não existe!',
      type: 'warning',
      position: 'middle',
      duration: 2000,
    });
  }

  const total = sumProducts(purchase?.products);

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>{purchase?.title}</Headline>

      <View style={{ height: 400 }}>
        <ListProducts products={purchase?.products} />
      </View>

      <Headline style={styles.total}>
        Preço total: {formatTotal(total)}
      </Headline>
    </View>
  );
}
