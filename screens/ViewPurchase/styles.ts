import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    textDecorationLine: 'underline',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 16,
  },

  listItemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
  },

  listItemItem: {
    fontSize: 25,
    flex: 1,
    width: '100%',
  },

  listItemPrice: {
    fontSize: 12,
  },

  total: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 25,
  },

  changeQuantity: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    elevation: 5,
  },
});

export default styles;
