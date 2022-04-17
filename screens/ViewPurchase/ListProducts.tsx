import React, { useState } from 'react';

import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Avatar,
  Divider,
  Headline,
  Paragraph,
  useTheme,
} from 'react-native-paper';

import { Product } from '../../@types/general.types';
import { usePurchases } from '../../contexts/PurchaseContext';
import { useBoolean } from '../../hooks/useBoolean';
import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';
import { formatPriceToBrazilStyle } from '../../utils/formatters';
import { ProductInfo } from './ProductInfo';

import styles from './styles';

interface ListProductsProps {
  products?: Product[];
}

export function ListProducts({
  products = [],
}: ListProductsProps): JSX.Element {
  const { colors } = useTheme();
  const { purchases, setPurchases } = usePurchases();

  const [productName, setProductName] = useState<string>();

  const [showChangeModal, openChangeModal, , setShowChangeModal] =
    useBoolean(false);

  function updateProduct(name: string): Product[] {
    return products.map((product) => {
      if (equalsCaseInsensitive(product.name, name)) {
        return { ...product, caught: !product.caught };
      }

      return product;
    });
  }

  function toggleCatchProduct(name: string): () => void {
    return () => {
      const newPurchases = purchases.map((purchase) => {
        return {
          ...purchase,
          products: updateProduct(name),
        };
      });

      setPurchases(newPurchases);
    };
  }

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
          style={styles.listItemContainer}
          onPress={selectProduct(item.name)}
        >
          <View style={{ flex: 0.9 }}>
            <Paragraph style={styles.listItemPrice}>
              {item.price ? formatPriceToBrazilStyle(item.price) : 'Sem preço'}
            </Paragraph>

            <Headline
              style={[
                {
                  textDecorationLine: item.caught ? 'line-through' : 'none',
                },
                styles.listItemItem,
              ]}
            >
              {item.name} x {item.quantity}{' '}
            </Headline>
          </View>

          <TouchableOpacity onPress={toggleCatchProduct(item.name)}>
            <Avatar.Icon
              icon={item.caught ? 'cart-remove' : 'check'}
              style={{
                backgroundColor: item.caught ? colors.error : colors.success,
              }}
              color={colors.background}
              size={40}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <Divider />
      </>
    );
  }

  const selectedProduct = products.find(({ name }) => name === productName);

  return (
    <>
      <ProductInfo
        product={selectedProduct}
        visible={showChangeModal}
        setVisible={setShowChangeModal}
      />

      <FlatList
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        keyExtractor={({ name }) => name}
        data={products}
      />
    </>
  );
}
