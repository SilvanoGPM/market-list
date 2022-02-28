import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { AddProductModal } from '../../components/AddProductModal';
import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';

type ViewPurchaseProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPurchase'
>;

export function ViewPurchase({
  navigation,
  route,
}: ViewPurchaseProps): JSX.Element {
  const { colors } = useTheme();

  const { purchases, setPurchases } = usePurchases();
  const toaster = useToast();

  const [showFAB, setShowFAB] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

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

  function deletePurchase(): void {
    const newPurchases = purchases.filter(({ id }) => purchase?.id !== id);
    setPurchases(newPurchases);

    toaster.show({
      message: 'A lista foi deletada.',
      position: 'middle',
      type: 'success',
    });

    navigation.goBack();
  }

  function openDeleteDialog(): void {
    setShowDeleteDialog(true);
  }

  function closeDeleteDialog(): void {
    setShowDeleteDialog(false);
  }

  function closeAddProductModal(): void {
    setAddProductModalVisible(false);
  }

  function openAddProductModal(): void {
    setAddProductModalVisible(true);
  }

  function handleAddProduct(product: Product): void {
    const nameAlreadyExists = purchase?.products.some(({ name }) =>
      equalsCaseInsensitive(name, product.name)
    );

    if (nameAlreadyExists) {
      toaster.show({
        message: 'Esse item já está na lista',
        position: 'middle',
        duration: 2000,
        type: 'info',
      });

      return;
    }

    const newPurchases = purchases.map((innerPurchase) => {
      if (innerPurchase?.id === purchase?.id) {
        return {
          ...purchase,
          products: [...(purchase?.products || []), product],
        };
      }

      return innerPurchase;
    });

    setPurchases(newPurchases);
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
        <Portal>
          <FAB.Group
            open={showFAB}
            visible
            onStateChange={({ open }) => setShowFAB(open)}
            fabStyle={{ backgroundColor: colors.primary }}
            icon={showFAB ? 'arrow-down-drop-circle' : 'arrow-up-drop-circle'}
            actions={[
              {
                icon: 'plus',
                label: 'Adicionar produto',
                style: { backgroundColor: colors.success },
                labelStyle: { backgroundColor: colors.success },
                labelTextColor: colors.background,
                color: colors.background,
                onPress: openAddProductModal,
                small: false,
              },
              {
                icon: 'delete',
                style: { backgroundColor: colors.error },
                labelStyle: { backgroundColor: colors.error },
                labelTextColor: colors.background,
                label: 'Deletar lista',
                onPress: openDeleteDialog,
                small: false,
              },
            ]}
          />
        </Portal>
      </View>

      <AddProductModal
        onAddProductEnd={handleAddProduct}
        visible={addProductModalVisible}
        closeModal={closeAddProductModal}
      />

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
