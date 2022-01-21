import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 8,
  },

  addProductModal: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 48,
  },

  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16
  },

  productListContent: {
    padding: 16,
  },

  input: {
    marginBottom: 16,
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

  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 32,
    left: 8,
    right: 8,
  },
});

export default styles;
