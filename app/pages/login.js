import React, {Component} from 'react';
import {Button, View} from 'react-native';

export class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Login"
            onPress={() =>
              navigate('Feed')
            }
          />
        </View>
      );
    }
  }