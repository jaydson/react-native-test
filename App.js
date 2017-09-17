import React from 'react';
import { StyleSheet, Text, View, Alert, Button, Image } from 'react-native';

async function logIn() {
  const APP_ID = '375722322841966';

  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
      permissions: ['public_profile'],
  });

  if (type === 'success') {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    const userData = await response.json();
    const userPic = `https://graph.facebook.com/v2.10/${userData.id}/picture?access_token=${token}`;
    userData.pic = userPic;
    return userData;
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: null}
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = async function() {  
    const data = await logIn();
    this.setState(data);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name ? `Welcome ${this.state.name}` : 'Your\'e not logged yet my friend!'}</Text>
        <Button onPress={this.handleLogin} title="FB Login" />
        <Image
            style={{width: 50, height: 50}}
            source={{uri: this.state.pic ? this.state.pic : 'https://facebook.github.io/react/img/logo_og.png'}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
