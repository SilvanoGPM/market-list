import { useState } from 'react';

import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import { Badge, Button, Divider, Headline, Title } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import { usePurchases } from '../../contexts/PurchaseContext';

import { AddProductModal } from './AddProductModal';
import { ChangeProductQuantity } from './ChangeProductQuantity';
import { NewPurchaseModal } from './NewPurchaseModal';

import styles from './styles';

export function NewPurchase() {
  const { addPurchase } = usePurchases();

  const toaster = useToast();

  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

  const [newPurchaseVisible, setNewPurchaseVisible] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState<string>();

  function renderItem({ item }: ListRenderItemInfo<Product>) {
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

  function openAddProductModal() {
    setAddProductModalVisible(true);
  }

  function closeAddProductModal() {
    setAddProductModalVisible(false);
  }

  function selectProduct(name: string) {
    return () => {
      setProductName(name);
    };
  }

  function closeNewPurchaseModal() {
    setNewPurchaseVisible(false);
  }

  function openNewPurchaseModal() {
    setNewPurchaseVisible(true);
  }

  function closeUpdateQuantityModal() {
    setProductName('');
  }

  function handleAddPurchase() {
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
        setProducts={setProducts}
        visible={addProductModalVisible}
        closeModal={closeAddProductModal}
      />

      <ChangeProductQuantity
        product={selectedProduct}
        closeModal={closeUpdateQuantityModal}
        setProducts={setProducts}
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
