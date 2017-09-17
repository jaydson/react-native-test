import React from 'react';
import { StyleSheet, Text, View, Alert, Button, Image } from 'react-native';
import FacebookLogin from './FacebookLogin';

export default class App extends React.Component {  
  render() {
    return (
      <FacebookLogin 
        appId='375722322841966' 
        textMessage='Please login in our awesome app!'
        imagePlaceholder='https://facebook.github.io/react/img/logo_og.png' />
    );
  }
}
