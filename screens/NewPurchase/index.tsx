import { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Badge,
  Button,
  Divider,
  Headline,
  Paragraph,
} from 'react-native-paper';

import { AddProductModal } from './AddProductModal';
import { ChangeProductQuantity } from './ChangeProductQuantity';

import styles from './styles';

export function NewPurchase() {
  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState<string>();

  function renderItem({ item }: ListRenderItemInfo<Product>) {
    return (
      <>
        <TouchableOpacity style={styles.product} onPress={selectProduct(item.name)}>
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

  function closeModal() {
    setProductName('');
  }

  const selectedProduct = products.find(({ name }) => name === productName);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        keyExtractor={({ name }) => `Product - ${name}`}
        contentContainerStyle={styles.productListContent}
        data={products}
      />

      <AddProductModal
        setProducts={setProducts}
        visible={addProductModalVisible}
        closeModal={closeAddProductModal}
      />

      <ChangeProductQuantity
        product={selectedProduct}
        closeModal={closeModal}
        setProducts={setProducts}
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

        <Button mode="contained" icon="check" style={{ flex: 1 }}>
          Criar lista
        </Button>
      </View>
    </View>
  );
}
