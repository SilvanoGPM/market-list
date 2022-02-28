import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 8,
  },

  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  productsTitle: {
    padding: 16,
    fontSize: 30,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  productListContent: {
    padding: 16,
  },

  changeQuantity: {
    height: 150,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    elevation: 5,
  },

  newPurchase: {
    padding: 16,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'flex-end',
  },

  fab: {
    padding: 4,
    borderRadius: 50,
  },
});

export default styles;
