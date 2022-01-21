import { v4 as uuid } from 'uuid';

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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface PurchasesListProps {
  purchases: Purchase[];
}

export function PurchasesList({ purchases }: PurchasesListProps) {
  const { colors } = useTheme();
  const navigatation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  function viewPurchase(id: string) {
    return () => {
      navigatation.navigate('ViewPurchase', { id });
    };
  }

  function renderListItem({ item }: ListRenderItemInfo<Purchase>) {

    return (
      <TouchableOpacity onPress={viewPurchase(item.id || '')}>
        <Card.Title
          style={[
            { borderColor: colors.primary, backgroundColor: colors.surface },
            styles.purchaseItem,
          ]}
          titleStyle={{ color: colors.primary, maxWidth: 200 }}
          title={item.title}
          subtitle={`Total: ${formatPriceToBrazilStyle(item.total)}`}
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
          keyExtractor={({ id }) => id || uuid()}
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
          <Paragraph style={styles.purchasesEmpty}>
            Nenhum compra realizada!
          </Paragraph>
        </View>
      )}
    </View>
  );
}
