import React, { useState } from 'react';
import { Badge, Button, Divider, Headline, Title } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';

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
  const toaster = useToast();

  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

  const [newPurchaseVisible, setNewPurchaseVisible] = useState<boolean>(false);
  const [showChangeModal, setShowChangeModal] = useState<boolean>(false);

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

      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          icon="plus"
          style={{ flex: 1, marginBottom: 8 }}
          onPress={openAddProductModal}
        >
          Adicionar Produto
        </Button>

        <Button
          mode="contained"
          icon="check"
          style={{ flex: 1 }}
          onPress={handleAddPurchase}
        >
          Criar lista
        </Button>
      </View>
    </View>
  );
}
