import React, {Component} from 'react';
import {Text, View} from 'react-native';
import TestApollo from '../../apollo/TestApollo'
export default class Feed extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{flex:1,justifyContent:'center'}}><Text>Feed!</Text></View>
            <TestApollo />
        </View>
      );
    }
  }
