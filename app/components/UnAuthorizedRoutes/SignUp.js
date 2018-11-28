import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight,Modal} from 'react-native';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            emailText:"",
            passwordText:"",
            displayTerms:false

        }
        this.signup = this.signup.bind(this)
        this.displayTerms = this.displayTerms.bind(this)
    }

    displayTerms(shouldDisplay) {
        this.setState({displayTerms:shouldDisplay})
    }

    signup() {
        console.log('hi why')
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
                <Modal
                    presentationStyle="overFullScreen"
                    transparent={true}
                    animationType="slide"
                    visible={this.state.displayTerms}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                    
                    >
                    <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
                        <View style={styles.modalStyle}>
                            <Text style={styles.titleText}>
                                Terms and Conditions
                            </Text>
                            <Text style={styles.leftText}>
                                This is a sample terms and conditions page!
                                We are still discussing what we are legally supposed
                                to put here.
                            </Text>

                            <TouchableOpacity
                                onPress={()=>{this.signup()}}
                                underlayColor='#fff'
                                style={[styles.button,styles.largeButton,{backgroundColor:"teal"}]}
                            >
                                <Text style={styles.innerButton}>Sign Up!</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={()=>this.displayTerms(false)}
                            underlayColor='#fff'
                            style={[styles.button,styles.largeButton,{backgroundColor:"#fcc000"}]}
                            >
                            <Text style={styles.innerButton}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </Modal>
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
                        onPress={()=>{
                            this.displayTerms(true)
                        }}
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
        fontSize: 36,
        marginLeft: 20,
        marginRight: 20
    },
    coolText: {
        margin: 20,
        color: '#9d2235',
        textAlign: 'center'
    },
    leftText: {
        marginTop: 30,
        color: '#9d2235',
        textAlign: 'left',
        margin:20
    },
    modalStyle: {
        justifyContent: 'center', 
        alignItems: 'center',
        height:"50%",
        marginTop:60,
        backgroundColor:'white',
        margin: 40,
        opacity:1
    }
})

