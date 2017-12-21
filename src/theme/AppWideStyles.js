import { StyleSheet } from 'react-native';

import Colors from './Colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Colors.snow,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartButton: {
    color: Colors.steel,
    marginRight: 15,
  },
  backButton: {
    marginLeft: 15,
  },
  cartItems: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    top: 0,
    right: 6,
    color: Colors.steel,
    backgroundColor: Colors.sky,
  },
});

export default styles;
