import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: "blue",
  },

  latestPurchases: {
    padding: 16,
  },

  latestPurchaseList: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    paddingRight: 48,
  },

  latestPurchaseItem: {
    borderRadius: 4,
    borderWidth: 1,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },

  fab: {
    padding: 8,
    borderRadius: 50,
  },
});

export default styles;
