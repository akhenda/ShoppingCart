// import react and react native to help create a component
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../theme';
import styles from './styles/HomeStyles';


/* eslint-disable react/prefer-stateless-function */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }
  
  componentWillMount() {
    firebase.auth().signInAnonymously()
      .catch(error => this.showAlert('Authentication Error', error.message));
    
    this.getProducts();
  }

  getProducts() {
    firebase.database().ref('products')
      .on('value', (snapshot) => {
        this.setState(() => ({ data: snapshot.val(), loading: false }));
      });
  }

  goToCart() {
    Actions.cart();
  }

  addToCart({ id, title, image, price }) {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.database().ref(`cart/${user.uid}/products`)
        .push({ id, title, price, image });
      ToastAndroid.show(
        `${title} of ${price} has been added to the cart.`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
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

  renderItem(item) {
    return (
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableHighlight style={styles.addToCart} onPress={() => this.addToCart(item)}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  
  renderSeparator() {
    return <View style={styles.separator} />;
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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

export default Home;
