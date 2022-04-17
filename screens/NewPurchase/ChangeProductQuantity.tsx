import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';

import {
  Avatar,
  Button,
  Dialog,
  Headline,
  Portal,
  useTheme,
} from 'react-native-paper';

import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';
import { useBoolean } from '../../hooks/useBoolean';
import { Product } from '../../@types/general.types';

import styles from './styles';

interface ChangeProductQuantityProps {
  product?: Product;
  visible: boolean;
  closeModal: () => void;
  setVisible: (visible: boolean) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ChangeProductQuantity({
  product,
  visible,
  setVisible,
  closeModal,
  setProducts,
}: ChangeProductQuantityProps): JSX.Element {
  const { colors } = useTheme();

  const [showDialog, openDialog, closeDialog] = useBoolean(false);

  function setQuantity(quantity: number): void {
    setProducts((products) =>
      products.map((innerProduct) => {
        if (equalsCaseInsensitive(innerProduct.name, product?.name || '')) {
          return { ...innerProduct, quantity };
        }

        return innerProduct;
      })
    );
  }

  function removeProduct(): void {
    setProducts((products) =>
      products.filter(
        ({ name }) => !equalsCaseInsensitive(name, product?.name || '')
      )
    );

    closeDialog();
    closeModal();
  }

  function openDialogAndCloseModal(): void {
    openDialog();
    setVisible(false);
  }

  function resetQuantity(): void {
    setQuantity(1);
    closeDialog();
  }

  function updateQuantity(quantity: number): void {
    if (quantity === 0) {
      openDialogAndCloseModal();
      return;
    }

    setQuantity(quantity);
  }

  return (
    <>
      <Portal>
        <Dialog dismissable={false} visible={showDialog}>
          <Dialog.Title>Deseja remover esse produto?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={resetQuantity}>Não</Button>
            <Button onPress={removeProduct}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Modal
        onRequestClose={closeModal}
        visible={visible}
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
            buttonLeftImage={
              <Avatar.Icon
                size={40}
                color={colors.icon}
                icon={product?.quantity === 1 ? 'trash-can-outline' : 'minus'}
              />
            }
            min={0}
            width="80%"
            color={colors.primary}
            onChange={updateQuantity}
            value={product?.quantity}
          />
        </View>
      </Modal>
    </>
  );
}
