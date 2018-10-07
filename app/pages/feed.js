import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class FeedScreen extends React.Component {
    static navigationOptions = {
        title: 'Feed',
      };
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Feed!</Text>
        </View>
      );
    }
  }