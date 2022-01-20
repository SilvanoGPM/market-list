import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    textAlign: 'center',
    fontSize: 32,
  },

  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  latestPurchases: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  purchasesInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  purchasesInfoCards: {
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },

  purchasesInfoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
  },

  purchasesInfoCardIcon: {
    alignItems: 'center',
  },

  fabContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
  },

  fab: {
    padding: 8,
    borderRadius: 50,
  },
});

export default styles;
