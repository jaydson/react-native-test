import React from 'react';
import { StyleSheet, Text, View, Alert, Button, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

async function logIn(appId) {
  if (!appId) { 
    throw new Exception('You should provide your Facebook App Id');
  }
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
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

export default class FacebookLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: null}
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = async function() {
    const userData = await logIn(this.props.appId);
    this.setState({data: userData});
  }

  handleLogout = () => {
    this.setState({
      data: null
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.data ? this.state.data.pic : this.props.imagePlaceholder}}
        />
        <Text>{this.state.data ? `Welcome ${this.state.data.name}` : this.props.textMessage}</Text>
          {this.state.data ? <Button onPress={this.handleLogout} title="LogOut" /> : <Button onPress={this.handleLogin} title="FB Login" /> }
      </View>
    );
  }
}
