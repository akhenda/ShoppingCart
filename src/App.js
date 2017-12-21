// import react and react native to help create a component
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Home from './containers/Home';
import Cart from './containers/Cart';
import { Colors } from './theme';
import styles from './theme/AppWideStyles';

// create the component
/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      totalItems: 0,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then((user) => { 
        firebase.database().ref(`cart/${user.uid}/meta`)
          .once('value', (snapshot) => {
            if (snapshot.val()) {
              const { totalItems } = snapshot.val();
              this.setState({ totalItems });
            }
          });
      })
      .catch(error => this.showAlert('Authentication Error', error.message));
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

  renderHeaderIcon(icon, action) {
    return (
      <TouchableOpacity onPress={() => action()}>
        {icon}
      </TouchableOpacity>
    );
  }
  
  render() {
    const backIcon = (
      <Icon
        size={30}
        color={Colors.snow}
        name="md-arrow-back"
        style={styles.backButton}
      />
    );
    const cartIcon = (
      <View>
        <Icon
          size={32}
          name="md-cart"
          color={Colors.snow}
          style={styles.cartButton}
        />
      <Text style={styles.cartItems}>{this.state.totalItems}</Text>
      </View>
    );

    return (
      <Router>
        <Scene key="root" navigationBarStyle={styles.header}>
          <Scene
            key="home"
            title="Movie Shop"
            component={Home}
            renderRightButton={() => this.renderHeaderIcon(cartIcon, Actions.cart)}
            titleStyle={styles.headerTitle}
          />
          <Scene
            key="cart"
            title="Cart"
            component={Cart}
            renderBackButton={() => this.renderHeaderIcon(backIcon, Actions.pop)}
            titleStyle={styles.headerTitle}
          />
        </Scene>
      </Router>
    );
  }
}

// export the component
export default App;
