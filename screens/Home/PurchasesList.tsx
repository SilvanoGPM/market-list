import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import { Avatar, Card, Headline, Paragraph, useTheme } from 'react-native-paper';

import { formatTotal } from '../../utils/formatters';

import styles from './styles';

interface PurchasesListProps {
  purchases: Purchase[];
}

export function PurchasesList({ purchases }: PurchasesListProps) {
  const { colors } = useTheme();

  function renderListItem({ item }: ListRenderItemInfo<Purchase>) {
    return (
      <TouchableOpacity>
        <Card.Title
          style={[
            { borderColor: colors.primary, backgroundColor: colors.surface },
            styles.purchaseItem,
          ]}
          titleStyle={{ color: colors.primary, maxWidth: 200 }}
          title={item.title}
          subtitle={`Total: ${formatTotal(item.total)}`}
          left={(props) => <Avatar.Icon {...props} size={48} icon="cart" />}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.purchasesListContainer}>
      <Headline style={{ marginBottom: 8 }}>Compras</Headline>

      {Boolean(purchases.length) ? (
        <FlatList
          horizontal
          style={[{ borderColor: colors.primary }, styles.purchaseList]}
          contentContainerStyle={{ overflow: 'scroll' }}
          data={purchases}
          keyExtractor={({ id }) => id}
          renderItem={renderListItem}
          ListFooterComponent={<View style={{ width: 16 }} />}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: '100%',
                  width: 8,
                }}
              />
            );
          }}
        />
      ) : (
        <View>
          <Paragraph style={styles.purchasesEmpty}>Nenhum compra realizada!</Paragraph>
        </View>
      )}
    </View>
  );
}
