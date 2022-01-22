import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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

  purchasesListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  purchaseList: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },

  purchaseItem: {
    borderRadius: 4,
    borderWidth: 1,
    height: 120,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  purchasesEmpty: {
    fontStyle: 'italic',
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
    alignItems: 'flex-end',
  },

  fab: {
    padding: 4,
    borderRadius: 50,
  },

  imageLoading: {
    position: 'absolute',
    top: 50,
  },
});

export default styles;
