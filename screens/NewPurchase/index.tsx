import React, { useState } from 'react';
import { useToast } from 'react-native-paper-toast';

import {
  Badge,
  Button,
  Dialog,
  Divider,
  FAB,
  Headline,
  Portal,
  Title,
  useTheme,
} from 'react-native-paper';

import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import { ChangeProductQuantity } from './ChangeProductQuantity';
import { NewPurchaseModal } from './NewPurchaseModal';
import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';
import { AddProductModal } from '../../components/AddProductModal';

import styles from './styles';

export function NewPurchase(): JSX.Element {
  const { colors } = useTheme();

  const toaster = useToast();

  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

  const [newPurchaseVisible, setNewPurchaseVisible] = useState<boolean>(false);
  const [showChangeModal, setShowChangeModal] = useState<boolean>(false);
  const [showFAB, setShowFAB] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState<string>();

  function selectProduct(name: string) {
    return () => {
      setProductName(name);
      setShowChangeModal(true);
    };
  }

  function renderItem({ item }: ListRenderItemInfo<Product>): JSX.Element {
    return (
      <>
        <TouchableOpacity
          style={styles.product}
          onPress={selectProduct(item.name)}
        >
          <Headline>{item.name}</Headline>
          <Badge size={30}>{item.quantity}</Badge>
        </TouchableOpacity>
        <Divider />
      </>
    );
  }

  function openAddProductModal(): void {
    setAddProductModalVisible(true);
  }

  function closeAddProductModal(): void {
    setAddProductModalVisible(false);
  }

  function closeNewPurchaseModal(): void {
    setNewPurchaseVisible(false);
  }

  function openNewPurchaseModal(): void {
    setNewPurchaseVisible(true);
  }

  function closeUpdateQuantityModal(): void {
    setProductName('');
    setShowChangeModal(false);
  }

  function handleAddProduct(product: Product): void {
    const nameAlreadyExists = products.some(({ name }) =>
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

    setProducts([...products, product]);
  }

  function handleAddPurchase(): void {
    if (products.length > 0) {
      openNewPurchaseModal();
    } else {
      toaster.show({
        message: 'Adicione pelo menos um protudo!',
        type: 'info',
        position: 'middle',
      });
    }
  }

  function openClearDialog(): void {
    setShowClearDialog(true);
  }

  function closeClearDialog(): void {
    setShowClearDialog(false);
  }

  function clearProductList(): void {
    setProducts([]);
    closeClearDialog();
  }

  const selectedProduct = products.find(({ name }) => name === productName);

  return (
    <View style={styles.container}>
      <Title style={styles.productsTitle}>Produtos</Title>

      <View style={{ height: 400 }}>
        <FlatList
          renderItem={renderItem}
          keyExtractor={({ name }) => `Product - ${name}`}
          contentContainerStyle={styles.productListContent}
          data={products}
        />
      </View>

      <AddProductModal
        onAddProductEnd={handleAddProduct}
        visible={addProductModalVisible}
        closeModal={closeAddProductModal}
      />

      <ChangeProductQuantity
        product={selectedProduct}
        closeModal={closeUpdateQuantityModal}
        setProducts={setProducts}
        visible={showChangeModal}
        setVisible={setShowChangeModal}
      />

      <NewPurchaseModal
        visible={newPurchaseVisible}
        closeModal={closeNewPurchaseModal}
        products={products}
      />

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
                icon: 'check',
                label: 'Criar lista',
                style: { backgroundColor: colors.success },
                labelStyle: { backgroundColor: colors.success },
                labelTextColor: colors.background,
                color: colors.background,
                onPress: handleAddPurchase,
                small: false,
              },
              {
                icon: 'plus',
                label: 'Adicionar produto',
                style: { backgroundColor: colors.primary },
                labelStyle: { backgroundColor: colors.primary },
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
                label: 'Limpar lista',
                onPress: openClearDialog,
                small: false,
              },
            ]}
          />
        </Portal>
      </View>

      <Portal>
        <Dialog visible={showClearDialog} onDismiss={closeClearDialog}>
          <Dialog.Title>Deseja limpar essa lista?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={closeClearDialog}>Não</Button>
            <Button onPress={clearProductList}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
