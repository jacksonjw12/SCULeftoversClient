import React, {Component} from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import TestApollo from '../../apollo/TestApollo'

export default class Settings extends React.Component {
    render() {
        if(!this.props.show){
            return null
        }
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',width:"100%" }}>

            <View style={{flex:1,marginTop:"30%"}}>
                <Text>Settings!!</Text>
            </View>
            <TestApollo />
             <View style={{flex:1, width:"100%",alignItems:'center'}}>
            <TouchableOpacity
                onPress={this.props.onLogout}
                style={[styles.button,styles.largeButton,{backgroundColor:"#fc3444"}]}
            >
                <Text style={styles.innerButton}>Log Out</Text>
            </TouchableOpacity>
             </View>
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
