import React, {Component} from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Settings extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!!</Text>
            <TouchableOpacity
                onPress={this.props.onLogout}
                style={[styles.button,styles.largeButton,{backgroundColor:"#fc3444"}]}
            >
                <Text style={styles.innerButton}>Log Out</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    button: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',


    },
    largeButton: {
      width:"60%"
    },
    innerButton: {
        textAlign:"center",
        color:"white"
    }

})
