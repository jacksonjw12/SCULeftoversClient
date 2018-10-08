import React, {Component} from 'react';
import {Button, Text, View, TextInput} from 'react-native';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,

        }
    }

    render() {
        const { navigate } = this.props.navigate;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>SCU Email</Text>

            <Button
                onPress={()=>this.props.navigate("home")}
                title="Back"
                backgroundColor="#fcc000"
                color="white"
                accessibilityLabel="Back"
            />
            </View>
        )
    }
  }
