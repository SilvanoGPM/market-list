import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

import {
  ActivityIndicator,
  Badge,
  Button,
  Dialog,
  Divider,
  FAB,
  Headline,
  Paragraph,
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
import { useStorage } from '../../hooks/useStorage';
import { useBoolean } from '../../hooks/useBoolean';

import styles from './styles';
import Repository from '../../lib/Repository';

const PRODUCTS_KEY = '@SkyG0D/Products';

export function NewPurchase(): JSX.Element {
  const { colors } = useTheme();

  const [addProductModalVisible, openAddProductModal, closeAddProductModal] =
    useBoolean(false);

  const [newPurchaseVisible, openNewPurchaseModal, closeNewPurchaseModal] =
    useBoolean(false);

  const [
    showChangeModal,
    openChangeModal,
    closeChangeModal,
    setShowChangeModal,
  ] = useBoolean(false);

  const [showFAB, , , setShowFAB] = useBoolean(false);

  const [showClearDialog, openClearDialog, closeClearDialog] =
    useBoolean(false);

  const [products, setProducts, loading] = useStorage<Product[]>(
    PRODUCTS_KEY,
    []
  );

  const [productName, setProductName] = useState<string>();

  function selectProduct(name: string) {
    return () => {
      setProductName(name);
      openChangeModal();
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

  function closeUpdateQuantityModal(): void {
    setProductName('');
    closeChangeModal();
  }

  function handleAddProduct(product: Product): void {
    const nameAlreadyExists = products.some(({ name }) =>
      equalsCaseInsensitive(name, product.name)
    );

    if (nameAlreadyExists) {
      Toast.show({
        text1: 'Esse item já está na lista',
        position: 'bottom',
        visibilityTime: 2000,
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
      Toast.show({
        text1: 'Adicione pelo menos um produto!',
        type: 'info',
        position: 'bottom',
      });
    }
  }

  function clearProductList(): void {
    setProducts([]);
    closeClearDialog();
  }

  async function handlePurchaseSuccess(): Promise<void> {
    await Repository.remove(PRODUCTS_KEY);
  }

  const selectedProduct = products.find(({ name }) => name === productName);

  return (
    <View style={styles.container}>
      <Title style={styles.productsTitle}>Produtos</Title>

      {products.length === 0 && !loading && (
        <Paragraph style={styles.tip}>
          Clique no botão abaixo e adicione produtos!
        </Paragraph>
      )}

      {loading && <ActivityIndicator />}

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
        products={products}
        onSuccess={handlePurchaseSuccess}
        closeModal={closeNewPurchaseModal}
      />

      <View style={styles.fabContainer}>
        <Portal>
          <FAB.Group
            color={colors.icon}
            open={showFAB}
            visible={!addProductModalVisible}
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
