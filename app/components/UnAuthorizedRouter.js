import React, {Component} from 'react';
import {Button, StyleSheet,Text, View, TouchableOpacity} from 'react-native';
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
                <View style={{flex:1}}>
                    <View style={{justifyContent: 'center', alignItems: 'center',height:"30%", marginTop:20}}>
                        <Text style={{ fontWeight: 'bold', color: '#9d2235', fontSize: 36}}>SCU Leftovers</Text>
                    </View>
                    <View style={{height:"70%",justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.navigate('login')
                            }
                            underlayColor='#fff'
                            style={[styles.button,styles.largeButton,{marginBottom:10}]}
                        >
                            <Text style={styles.innerButton}>Log In</Text>
                        </TouchableOpacity>

                        <Text style={{color:"#9d2235"}}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() =>
                                this.navigate('signUp')
                            }
                            underlayColor='#fff'
                            style={[styles.button,styles.largeButton,{marginTop:1}]}
                        >
                            <Text style={styles.innerButton}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>
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
                <View style={{flex:1,justifyContent:"center"}}>
                <Text>Invalid UnAuthorizedRouter View {this.state.view}</Text>
                </View>
            )
        }
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
      width:"60%",
      backgroundColor:"#9d2235",
    },
    innerButton: {
        textAlign:"center",
        color:"white"
    }

})
