import { StyleSheet } from 'react-native';

import { Colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  productContainer: {
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
  productImageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  productQuantity: {
    flex: 1,
    paddingHorizontal: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  productImage: {
    flex: 4,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productTitle: {
    flex: 3,
    fontSize: 16,
    fontWeight: '700',
    flexWrap: 'wrap',
    marginRight: 6,
  },
  productPrice: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  productRemove: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cartItemsHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
  cartItemsImages: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  cartItemsInfo: {
    flex: 4.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cartItemsProducts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  cartItemsAmounts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  cartItemsAction: {
    flex: 0.6,
  },
  cartItemsFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingLeft: '5%',
    paddingRight: '15%',
  },
  cartItemsTotalText: {
    fontSize: 24,
    color: Colors.text,
    marginRight: 20,
  },
  cartItemsTotalAmount: {
    fontSize: 30,
    color: Colors.text,
  },
  separator: {
    height: 1,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: Colors.separator,
    marginVertical: 10,
  },
  emptyCart: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.sky,
    textAlign: 'center',
    marginTop: 60,
  },
});

export default styles;
