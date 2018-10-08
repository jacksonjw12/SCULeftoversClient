import React, {Component} from 'react';
import {Button, Text, View, TextInput} from 'react-native';

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            loginPageView:"main",
            loginPageLoginEmailText:"",
            loginPathLoginPasswordText:""
        }
        this.login = this.login.bind(this)
    }
    login(){
        //this.setState({loginPageView:"main"})
        const email = this.state.loginPageLoginEmailText
        const password = this.state.loginPathLoginPasswordText
        fetch(`${this.props.uri}/login?email=${email}&password=${password}`, {
          credentials: 'same-origin',
        })
          .then(response => response.json())
          .then((response) => {
            if (response && response.id) {
              Keyboard.dismiss()
              AsyncStorage.setItem('email', email)
              AsyncStorage.setItem('password', password)
              this.props.onLogin(true, response.handle, cf)

              // if (deepLink && deepLink.type === 'invite') {
              //   Actions.onboardGroupJoin({
              //     deepLink,
              //   })
              // } else {
              //   Actions.main()
              // }
            } else {
              event('ReturningUser_VerifCode_Error')
              this.errorLogin()
            }
          })
          .catch((error) => {
            this.errorLogin()
          })
    }

    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      if(this.state.loginPageView === "main"){
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                title="Login"
                onPress={() =>
                  this.setState({loginPageView:"login"})
                }
              />

              <Text>Don't have an account?</Text>

              <Button
                title="Sign Up"
                onPress={() =>
                  navigate('Feed')
                }
              />
            </View>
        );
      }
      else if(this.state.loginPageView === "login"){
         return (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                 <Text>SCU Email</Text>
                 <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%"}}
                    onChangeText={(text) => this.setState({loginPageLoginEmailText:text})}
                    value={this.state.loginPageLoginEmailText}
                />
                 <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:10,width:"80%"}}
                    onChangeText={(text) => this.setState({loginPageLoginPasswordText:text})}
                    value={this.state.loginPageLoginPasswordText}
                    secureTextEntry={true}
                />
                <Button
                    onPress={this.login}
                    title="Log In"
                    color="teal"
                    accessibilityLabel="Log In"
                />
             </View>
             )


      }


    }
  }
