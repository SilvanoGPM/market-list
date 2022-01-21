import { useState } from 'react';

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

import { usePurchases } from '../../contexts/PurchaseContext';
import { equalsCaseInsensitive } from '../../utils/equalsIgnoreCase';
import { formatPriceToBrazilStyle } from '../../utils/formatters';
import { ProductInfo } from './ProductInfo';

import styles from './styles';

interface ListProductsProps {
  products?: Product[];
}

export function ListProducts({ products = [] }: ListProductsProps) {
  const { colors } = useTheme();
  const { setPurchases } = usePurchases();

  const [productName, setProductName] = useState<string>();
  const [showChangeModal, setShowChangeModal] = useState<boolean>(false);

  function toggleCatchProduct(name: string) {
    return () => {
      setPurchases((purchases) => {
        return purchases.map((purchase) => {
          const hasProduct = purchase.products.some((product) =>
            equalsCaseInsensitive(product.name, name)
          );

          if (hasProduct) {
            return {
              ...purchase,
              products: products.map((product) => {
                if (equalsCaseInsensitive(product.name, name)) {
                  return { ...product, caught: !product.caught };
                }

                return product;
              }),
            };
          }

          return purchase;
        });
      });
    };
  }

  function selectProduct(name: string) {
    return () => {
      setProductName(name);
      setShowChangeModal(true);
    };
  }

  function renderItem({ item }: ListRenderItemInfo<Product>) {
    return (
      <>
        <TouchableOpacity style={styles.listItemContainer} onPress={selectProduct(item.name)}>
          <View style={{ flex: 0.9 }}>
            <Paragraph style={styles.listItemPrice}>
              {item.price ? formatPriceToBrazilStyle(item.price || 0) : 'Sem preço'}
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

  function closeUpdateQuantityModal() {
    setProductName('');
    setShowChangeModal(false);
  }

  const selectedProduct = products.find(({ name }) => name === productName);

  return (
    <>
      <ProductInfo
        product={selectedProduct}
        closeModal={closeUpdateQuantityModal}
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
