import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';

import {
  Avatar,
  Button,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { usePurchases } from '../../contexts/PurchaseContext';
import { useBoolean } from '../../hooks/useBoolean';
import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';
import { formatPriceToBrazilStyle } from '../../utils/formatters';
import { sumProducts } from '../../utils/sumProducts';

import styles from './styles';

interface ProductInfoProps {
  product?: Product;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export function ProductInfo({
  product,
  visible,
  setVisible,
}: ProductInfoProps): JSX.Element {
  const { colors } = useTheme();
  const { setPurchases } = usePurchases();

  const [price, setPrice] = useState<string>('');

  const [showDialog, openDialog, closeDialog] = useBoolean(false);

  const [priceUpdating, startPriceUpdating, resetPriceUpdating] =
    useBoolean(false);

  useEffect(() => {
    if (product && !priceUpdating) {
      const productPrice = product.price;
      setPrice(productPrice ? productPrice.toFixed(2) : '');
    }
  }, [product, priceUpdating]);

  function setProdutcs(mapper: (innerProduct: Product) => Product): void {
    setPurchases((purchases) => {
      return purchases.map((purchase) => {
        const products = purchase.products.map(mapper);

        return {
          ...purchase,
          total: sumProducts(products),
          products,
        };
      });
    });
  }

  function setQuantity(quantity: number): void {
    setProdutcs((innerProduct) => {
      if (equalsCaseInsensitive(innerProduct.name, product?.name || '')) {
        return { ...innerProduct, quantity };
      }

      return innerProduct;
    });
  }

  function handlePriceChanged(value: string): void {
    const newPrice = Number(value);

    if (Number.isNaN(newPrice)) {
      return;
    }

    setPrice(value);
    startPriceUpdating();

    setProdutcs((innerProduct) => {
      if (equalsCaseInsensitive(innerProduct.name, product?.name || '')) {
        return { ...innerProduct, price: newPrice };
      }

      return innerProduct;
    });
  }

  function closeModal(): void {
    setVisible(false);
    resetPriceUpdating();
  }

  function openDialogAndCloseModal(): void {
    openDialog();
    setVisible(false);
  }

  function removeProduct(): void {
    setPurchases((purchases) => {
      return purchases.map((purchase) => {
        return {
          ...purchase,
          products: purchase.products.filter(
            ({ name }) => !equalsCaseInsensitive(name, product?.name || '')
          ),
        };
      });
    });

    closeDialog();
    closeModal();
  }

  function resetQuantity(): void {
    setQuantity(1);
    closeDialog();
  }

  function updateQuantity(quantity: number): void {
    if (quantity === 0) {
      openDialogAndCloseModal();
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
          <Headline style={{ color: colors.primary, marginBottom: 4 }}>
            {product?.name}
          </Headline>

          {Boolean(product?.price) && (
            <Paragraph style={{ marginBottom: 8 }}>
              {product?.quantity} x{' '}
              {formatPriceToBrazilStyle(product?.price || 0)} ={' '}
              {formatPriceToBrazilStyle(
                (product?.quantity || 0) * (product?.price || 0)
              )}
            </Paragraph>
          )}

          <TextInput
            style={{ width: '80%', marginBottom: 16 }}
            label="Preço"
            value={price}
            keyboardType="number-pad"
            onChangeText={handlePriceChanged}
            onBlur={resetPriceUpdating}
          />

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
