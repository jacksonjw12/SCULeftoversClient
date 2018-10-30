import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            emailText:"",
            passwordText:""

        }
        this.signup = this.signup.bind(this)
    }

    signup() {
        fetch(`http://localhost:8000/signup?email=${this.state.emailText}&password=${this.state.passwordText}`, 
        {credentials: 'same-origin'})
        .then(response => response.json())
        .catch(err => console.log(err))
        this.props.navigate("main");
    }
    
    render() {
        const { navigate } = this.props.navigate;
        return (
            
            <View style={{flex:1}}>
                <View style={{justifyContent: 'center', alignItems: 'center',height:"50%",marginTop:20}}>           
                    <Text style={styles.titleText}>SCU Leftovers</Text>
                    <Text style={styles.coolText}>Welcome to SCU Leftovers! To get started sharing food, sign up for an account below!</Text>
                    <Text style={styles.leftText}>
                    How does it work? Once you have an account, you're ready to start donating food! Create posts for your food items, 
                    and leave the food at a designated drop off location on campus!
                    You could also browse the feed to see what food is currently available at our drop off locations!
                    </Text>
                </View>
                <View style = {{justifyContent: 'center', alignItems: 'center',}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%",bottom:5,backgroundColor:"white"}}
                        onChangeText={(text) => this.setState({emailText:text.toLowerCase()})}
                        value={this.state.emailText}
                        placeholder="SCU Email Address"
                        
                    />
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%",backgroundColor:"white"}}
                        onChangeText={(text) => this.setState({passwordText:text})}
                        value={this.state.passwordText}
                        secureTextEntry={true}
                        placeholder="Password"
                    />

                    <TouchableOpacity
                        onPress={this.signup}
                        underlayColor='#fff'
                        style={[styles.button,styles.largeButton,{backgroundColor:"teal"}]}
                    >
                        <Text style={styles.innerButton}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.props.navigate("main")}
                        underlayColor='#fff'
                        style={[styles.button,styles.largeButton,{backgroundColor:"#fcc000"}]}
                    >
                        <Text style={styles.innerButton}>Back</Text>
                    </TouchableOpacity>
                </View>
             </View>
        )
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
    },
    titleText: {
        marginTop: 5,
        fontWeight: 'bold', 
        color: '#9d2235', 
        fontSize: 36
    },
    coolText: {
        marginTop: 30,
        color: '#9d2235',
        textAlign: 'center'
    },
    leftText: {
        marginTop: 30,
        color: '#9d2235',
        textAlign: 'left'
    }
})

