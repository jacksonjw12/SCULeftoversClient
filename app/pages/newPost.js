import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class NewPostScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>New Post!</Text>
        </View>
      );
    }
  }