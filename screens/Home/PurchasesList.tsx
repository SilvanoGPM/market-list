import React from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Avatar,
  Card,
  Headline,
  Paragraph,
  useTheme,
} from 'react-native-paper';

import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import { formatPriceToBrazilStyle } from '../../utils/formatters';

import styles from './styles';

interface PurchasesListProps {
  purchases: Purchase[];
}

function ListSeparator(): JSX.Element {
  return (
    <View
      style={{
        height: '100%',
        width: 8,
      }}
    />
  );
}

function CartIcon(): JSX.Element {
  const { colors } = useTheme();
  return <Avatar.Icon color={colors.icon} size={48} icon="cart" />;
}

export function PurchasesList({ purchases }: PurchasesListProps): JSX.Element {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  function viewPurchase(id: string) {
    return () => {
      navigation.navigate('ViewPurchase', { id });
    };
  }

  function renderListItem({ item }: ListRenderItemInfo<Purchase>): JSX.Element {
    return (
      <TouchableOpacity onPress={viewPurchase(item.id)}>
        <Card.Title
          style={[
            { borderColor: colors.primary, backgroundColor: colors.surface },
            styles.purchaseItem,
          ]}
          titleStyle={{ color: colors.primary, maxWidth: 200 }}
          title={item.title}
          subtitle={
            item.total
              ? `Preço estimado: ${formatPriceToBrazilStyle(item.total)}`
              : 'Produtos sem preço'
          }
          left={CartIcon}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.purchasesListContainer}>
      <Headline style={{ marginBottom: 8 }}>Compras</Headline>

      {purchases.length ? (
        <FlatList
          horizontal
          contentContainerStyle={{ overflow: 'scroll' }}
          data={purchases}
          keyExtractor={({ id }) => id || uuid()}
          renderItem={renderListItem}
          ListFooterComponent={<View style={{ width: 16 }} />}
          ItemSeparatorComponent={ListSeparator}
        />
      ) : (
        <View>
          <Paragraph style={styles.purchasesEmpty}>
            Nenhuma compra realizada!
          </Paragraph>
        </View>
      )}
    </View>
  );
}
