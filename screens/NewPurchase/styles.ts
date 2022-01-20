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

  input: {
    marginBottom: 16,
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
