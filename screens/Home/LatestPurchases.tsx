import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';

import { Avatar, Card, Headline, useTheme } from 'react-native-paper';

import { formatTotal } from '../../utils/formatters';

import styles from './styles';

interface LatestPurchasesProps {
  purchases: Purchase[];
}

export function LatestPurchases({ purchases }: LatestPurchasesProps) {
  const { colors } = useTheme();

  function renderListItem({ item }: ListRenderItemInfo<Purchase>) {
    return (
      <TouchableOpacity>
        <Card.Title
          style={[{ borderColor: colors.primary }, styles.latestPurchaseItem]}
          titleStyle={{ color: colors.primary }}
          title={item.title}
          subtitle={`Tota: ${formatTotal(item.total)}`}
          left={(props) => <Avatar.Icon {...props} size={48} icon="cart" />}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.latestPurchases}>
      <Headline style={{ marginBottom: 8 }}>Últimas Compras</Headline>

      <View>
        <FlatList
          horizontal
          style={[{ borderColor: colors.primary }, styles.latestPurchaseList]}
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
      </View>
    </View>
  );
}
