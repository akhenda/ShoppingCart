import { StyleSheet } from 'react-native';

import { Colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    height: 120,
    padding: 15,
  },
  productImageContainer: {
    flex: 1,
  },
  productImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  productGenre: {
    fontSize: 12,
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 24,
    color: Colors.text,
  },
  addToCart: {
    position: 'absolute',
    top: 30,
    right: 0,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  addToCartText: {
    padding: 10,
    color: Colors.steel,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.separator,
    marginVertical: 10,
  },
});

export default styles;
