import React, {Component} from 'react';
import {Button, Text, View, TextInput,AsyncStorage,TouchableOpacity,StyleSheet} from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            emailText:"",
            passwordText:""
        }
        this.login = this.login.bind(this)
    }
    login(){
        //this.setState({loginPageView:"main"})
        const email = this.state.emailText
        const password = this.state.passwordText
        fetch(`http://localhost:8000/login?email=${email}&password=${password}`, {
          credentials: 'same-origin',
        })
          .then(response => response.json())
          .then((response) => {
              console.log(response)


             if (response && response.id) {
              //Keyboard.dismiss()
               AsyncStorage.setItem('email', email)
               AsyncStorage.setItem('password', password)
               AsyncStorage.setItem('id', response.id)

                console.log("logged in")

                 console.log(this)
              this.props.onLogin(response.id,email)
          //
          //     if (deepLink && deepLink.type === 'invite') {
          //       Actions.onboardGroupJoin({
          //         deepLink,
          //       })
          //     } else {
          //       Actions.main()
          //     }
            } else {
              //event('ReturningUser_VerifCode_Error')
                console.log("failed login1")
              //this.errorLogin()
            }
          })
          .catch((error) => {
            //this.errorLogin()
              console.log(error)
              console.log("failed login2")
          })
    }

    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigate;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontWeight: 'bold', color: '#9d2235', fontSize: 36}}>SCU Leftovers</Text>
            <Text>SCU Email</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%"}}
                onChangeText={(text) => this.setState({emailText:text.toLowerCase()})}
                value={this.state.emailText}
            />
            <Text>Password</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%"}}
                onChangeText={(text) => this.setState({passwordText:text})}
                value={this.state.passwordText}
                secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={this.login}
                underlayColor='#fff'
                style={[styles.button,styles.largeButton,{backgroundColor:"teal"}]}
            >
                <Text style={styles.innerButton}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>this.props.navigate("main")}
                underlayColor='#fff'
                style={[styles.button,styles.largeButton,{backgroundColor:"#fcc000"}]}
            >
                <Text style={styles.innerButton}>Back</Text>
            </TouchableOpacity>
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
    }

})
