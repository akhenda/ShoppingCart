// import react and react native to help create a component
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../theme';
import styles from './styles/CartStyles';


/* eslint-disable react/prefer-stateless-function */
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      total: 0,
    };
  }

  componentDidMount() {
    this.getProductsInCart();
  }

  getProductsInCart() {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.database().ref(`cart/${user.uid}/products`)
        .on('value', (snapshot) => {
          let dupIndex = 0;
          const data = [];
          
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach((id) => {
              const duplicate = (item, index) => {
                if (item.id === snapshot.val()[id].id) {
                  dupIndex = index;
                  return true;
                }
              };

              if (data.find(duplicate)) {
                data[dupIndex].count += 1;
              } else {
                data.push({
                  count: 1,
                  key: id,
                  id: snapshot.val()[id].id,
                  title: snapshot.val()[id].title,
                  price: Number(snapshot.val()[id].price.slice(1)),
                  image: snapshot.val()[id].image,
                });
              }
              dupIndex = 0;
            });
          }

          this.setState(
            () => ({ data, loading: false }),
            () => this.calculateTotal(),
          );
        });
    } else {
      this.showAlert(
        'Permission Error',
        'You are not Logged In. Reload app to Log In anonymously',
      );
    }
  }
  
  removeProduct(item) {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.database().ref(`cart/${user.uid}/products/${item.key}`).remove();
    } else {
      this.showAlert(
        'Permission Error',
        'You are not Logged In. Reload app to Log In anonymously',
      );
    }
  }

  showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'OK', onPress: () => null },
      ],
      { cancelable: false },
    );
  }
  
  calculateTotal() {
    let totalItems = 0;
    const { data } = this.state;
    const user = firebase.auth().currentUser;

    const total = data.reduce((sum, item) => {
      totalItems += 1;
      return sum + (item.price * item.count);
    }, 0).toFixed(2);
    
    this.setState({ total });

    firebase.database().ref(`cart/${user.uid}`)
      .update({ meta: { total, totalItems } })
      .catch(error => this.showAlert('Firebase Error', error.message));
  }

  renderItem(item) {
    return (
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Text style={styles.productQuantity}>{item.count}</Text>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price * item.count}</Text>
        </View>
        <TouchableOpacity
          style={styles.productRemove}
          onPress={() => this.removeProduct(item)}
        >
          <Icon size={32} color={Colors.primary} name="md-close" />
        </TouchableOpacity>
      </View>
    );
  }
  
  renderSeparator() {
    return <View style={styles.separator} />;
  }
  
  renderHeader() {
    return (
      <View style={styles.cartItemsHeader}>
        <Text style={styles.cartItemsImages}>Qty</Text>
        <View style={styles.cartItemsInfo}>
          <Text style={styles.cartItemsProducts}>Product</Text>
          <Text style={styles.cartItemsAmounts}>Amount</Text>
        </View>
        <Text style={styles.cartItemsAction} />
      </View>
    );
  }
  
  renderFooter() {
    return (
      <View style={styles.cartItemsFooter}>
        <Text style={styles.cartItemsTotalText}>Total</Text>
        <Text style={styles.cartItemsTotalAmount}>
          ${this.state ? this.state.total : 0}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={70} color={Colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primaryTransparent} />
        {this.state.total > 0
          ? <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => this.renderFooter()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        : <Text style={styles.emptyCart}>Your Cart is Empty</Text>
        }
      </View>
    );
  }
}

export default Cart;
