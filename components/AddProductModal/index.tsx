import React, { useState } from 'react';
import { View } from 'react-native';

import {
  Button,
  HelperText,
  Modal,
  Portal,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';

import styles from './styles';

interface AddProductModalProps {
  visible: boolean;
  closeModal: () => void;
  onAddProductEnd: (product: Product) => void;
}

export function AddProductModal({
  visible,
  closeModal,
  onAddProductEnd,
}: AddProductModalProps): JSX.Element {
  const { colors } = useTheme();

  const [product, setProduct] = useState<Product>({ quantity: 1 } as Product);
  const [nameDirty, setNameDirty] = useState<boolean>(false);

  function handleProductName(name: string): void {
    setProduct({ ...product, name });
    setNameDirty(true);
  }

  function handleProductQuantity(value: string): void {
    const quantityConverted = Number(value);
    const quantity = quantityConverted || 0;
    setProduct({ ...product, quantity });
  }

  function validateQuantity(): void {
    if (!product.quantity) {
      setProduct({ ...product, quantity: 1 });
    }
  }

  function addProduct(): void {
    const productName = product.name.trim();
    const productIsValid = productName && product.quantity;

    if (productIsValid) {
      onAddProductEnd({ ...product, name: productName });
      closeModal();
      setNameDirty(false);
      setProduct({ quantity: 1 } as Product);
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={[
          { backgroundColor: colors.background },
          styles.addProductModal,
        ]}
      >
        <Title style={{ marginBottom: 32 }}>Adicionar Produto</Title>
        <View>
          <View style={styles.input}>
            <TextInput
              label="Nome"
              placeholder="ex: Arroz"
              value={product.name}
              onChangeText={handleProductName}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={nameDirty && product.name.length < 3}
            >
              Nome precisa conter pelo menos 3 caracteres!
            </HelperText>
          </View>

          <View style={styles.input}>
            <TextInput
              label="Quantidade"
              keyboardType="number-pad"
              value={String(product.quantity || '')}
              onBlur={validateQuantity}
              onChangeText={handleProductQuantity}
              mode="outlined"
            />
          </View>
        </View>

        <Button
          labelStyle={{ color: colors.icon }}
          mode="contained"
          icon="plus"
          onPress={addProduct}
        >
          Adicionar
        </Button>
      </Modal>
    </Portal>
  );
}
