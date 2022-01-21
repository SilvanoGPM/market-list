import { useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'react-native-paper-toast';

import {
  Button,
  HelperText,
  Modal,
  Portal,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';

import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';

import styles from './styles';

interface AddProductModalProps {
  visible: boolean;
  closeModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function AddProductModal({
  visible,
  closeModal,
  setProducts,
}: AddProductModalProps) {
  const { colors } = useTheme();
  const toaster = useToast();

  const [product, setProduct] = useState<Product>({ quantity: 1 } as Product);
  const [nameDirty, setNameDirty] = useState<boolean>(false);

  function handleProductName(value: string) {
    const name = value.trim();
    setProduct({ ...product, name });
    setNameDirty(true);
  }

  function handleProductQuantity(value: string) {
    const quantityConverted = Number(value);
    const quantity = quantityConverted || 0;
    setProduct({ ...product, quantity });
  }

  function validateQuantity() {
    if (!product.quantity) {
      setProduct({ ...product, quantity: 1 });
    }
  }


  function addProduct() {
    const productIsValid = product.name && product.quantity;

    if (productIsValid) {
      setProducts((products) => {
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

          return products;
        }

        return [...products, product];
      });

      setNameDirty(false);
      setProduct({ quantity: 1 } as Product);
      closeModal();
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

        <Button mode="contained" icon="plus" onPress={addProduct}>
          Adicionar
        </Button>
      </Modal>
    </Portal>
  );
}
