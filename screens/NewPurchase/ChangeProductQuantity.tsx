import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { Headline, useTheme } from 'react-native-paper';

import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';

import styles from './styles';

interface ChangeProductQuantityProps {
  product?: Product;
  closeModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ChangeProductQuantity({
  product,
  closeModal,
  setProducts,
}: ChangeProductQuantityProps) {
  const { colors } = useTheme();

  function updateQuantity(quantity: number) {
    setProducts((products) =>
      products.map((innerProduct) => {
        if (equalsCaseInsensitive(innerProduct.name, product?.name || '')) {
          return { ...innerProduct, quantity };
        }

        return innerProduct;
      })
    );
  }

  return (
    <Modal
      onRequestClose={closeModal}
      visible={Boolean(product)}
      animationType="slide"
      transparent
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
      </TouchableWithoutFeedback>

      <View
        style={[
          { backgroundColor: colors.background, borderColor: colors.primary },
          styles.changeQuantity,
        ]}
      >
        <Headline style={{ color: colors.primary, marginBottom: 8 }}>
          {product?.name}
        </Headline>

        <InputSpinner
          skin="square"
          continuity
          max={99}
          min={1}
          width="80%"
          color={colors.primary}
          onChange={updateQuantity}
          value={product?.quantity}
        />
      </View>
    </Modal>
  );
}
