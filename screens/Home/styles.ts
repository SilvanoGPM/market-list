import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'blue',
  },

  fixBackground: {
    width: '100%',
    height: 50,
    marginTop: -50,
  },

  header: {
    justifyContent: 'flex-end',
    height: 180,
  },

  headerTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 32,
  },

  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  latestPurchases: {
    padding: 16,
  },

  latestPurchaseList: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },

  latestPurchaseItem: {
    borderRadius: 4,
    borderWidth: 1,
    height: 120,
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
