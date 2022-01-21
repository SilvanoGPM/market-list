import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'react-native-paper-toast';

import {
  Button,
  Dialog,
  FAB,
  Headline,
  Portal,
  useTheme,
} from 'react-native-paper';

import { usePurchases } from '../../contexts/PurchaseContext';
import { formatPriceToBrazilStyle } from '../../utils/formatters';
import { sumProducts } from '../../utils/sumProducts';
import { ListProducts } from './ListProducts';

import styles from './styles';

type ViewPurchaseProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPurchase'
>;

export function ViewPurchase({ navigation, route }: ViewPurchaseProps) {
  const { colors } = useTheme();
  const { purchases, setPurchases } = usePurchases();
  const toaster = useToast();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  function deletePurchase() {
    const newPurchases = purchases.filter(({ id }) => purchase?.id !== id);
    setPurchases(newPurchases);

    toaster.show({
      message: 'A lista foi deletada.',
      position: 'middle',
      type: 'success',
    });

    navigation.goBack();
  }

  function openDeleteDialog() {
    setShowDeleteDialog(true);
  }

  function closeDeleteDialog() {
    setShowDeleteDialog(false);
  }

  const total = sumProducts(purchase?.products);

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>{purchase?.title}</Headline>

      <View style={{ maxHeight: 400 }}>
        <ListProducts products={purchase?.products} />
      </View>

      <Headline style={styles.total}>
        Preço estimado: {formatPriceToBrazilStyle(total)}
      </Headline>

      <View style={styles.fabContainer}>
        <FAB
          onPress={openDeleteDialog}
          style={[{ backgroundColor: colors.error }, styles.fab]}
          icon="trash-can-outline"
        />
      </View>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={closeDeleteDialog}>
          <Dialog.Title>Deseja remover essa lista?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={closeDeleteDialog}>Não</Button>
            <Button onPress={deletePurchase}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
