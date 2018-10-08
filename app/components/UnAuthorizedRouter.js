import React, {Component} from 'react';
import {Button, Text, View, TextInput} from 'react-native';
import Login from './UnAuthorizedRoutes/Login'
import SignUp from './UnAuthorizedRoutes/SignUp'

export default class UnAuthorizedRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            view:"main"
        }
        this.navigate = this.navigate.bind(this)
    }
    navigate(location){
        this.setState({"view":location})
    }

    render() {
        if(this.state.view === "main"){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        title="Login"
                        onPress={() =>
                            this.navigate('login')
                        }
                    />

                    <Text>Don't have an account?</Text>

                    <Button
                        title="Sign Up"
                        onPress={() =>
                            this.navigate('signUp')
                        }
                    />
                </View>
            );
        }
        else if(this.state.view === "login"){
            return (
                <Login
                    navigate={this.navigate}
                    onLogin={(id,email)=>this.props.onLogin(id,email,false,true)}
                />

            )
        }
        else if(this.state.view === "signUp"){
            return (
                <SignUp
                    navigate={this.navigate}
                />
            )
        }
        else{
            return (
                <Text>Invalid UnAuthorizedRouter View {this.state.view}</Text>
            )
        }
    }
  }
