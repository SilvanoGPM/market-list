import { useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Badge, Button, Paragraph } from 'react-native-paper';

import { AddProductModal } from './AddProductModal';

import styles from './styles';

export function NewPurchase() {
  const [addProductModalVisible, setAddProductModalVisible] =
    useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  function renderItem({ item }: ListRenderItemInfo<Product>) {
    return (
      <View>
        <Paragraph>{item.name}</Paragraph>
        <Badge>{item.quantity}</Badge>
      </View>
    );
  }

  function openAddProductModal() {
    setAddProductModalVisible(true);
  }

  function closeAddProductModal() {
    setAddProductModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        keyExtractor={({ name }) => `Product - ${name}`}
        data={products}
      />

      <AddProductModal
        setProducts={setProducts}
        visible={addProductModalVisible}
        closeModal={closeAddProductModal}
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
