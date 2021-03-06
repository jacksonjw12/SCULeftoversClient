import React, {Component} from 'react';
import { Text, AsyncStorage } from 'react-native';
import UnAuthorizedRouter from './UnAuthorizedRouter'
import MainRouter from './MainRouter'
import env from '../environment'
export default class RootRouter extends Component {
    constructor(props){
        super(props)
        this.user = {}
        this.state = {
            ...this.state,
            loggedIn:props.loggedIn,
            view: "unAuthorizedRouter",
           user:this.user,
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)



    }
    async componentDidMount() {
        const email = await AsyncStorage.getItem('email')
        const password = await AsyncStorage.getItem('password')
        if(email && password){//login
            this.login(email,password,this.handleLogin)
        }
    }
    login(email,password,callback){

        fetch(env.server+`/login?email=${email}&password=${password}`, {
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

                 callback(response.id,email)

            } else {
                console.log("failed login1")
            }
          })
          .catch((error) => {
              console.log(error)
              console.log("failed login2")
          })
    }
    navigate(location){
        if(this.state.loggedIn){
            this.setState({view:location})
        }

    }
    async handleLogin(id,email,verified=false,onBoarded=true){
        const username = email.split('@')[0]
        this.user = {
            id,
            email,
            verified,
            onBoarded
        }
        console.log("root router logged in")
        this.setState({
            loggedIn:true,
            view:"home"
        })

    }
    async handleLogout(logout){
        let client = this.props.client
        fetch(env.server+`/logout`, {
          credentials: 'same-origin',
        }).then((response) => {
            console.log(response)


            if (response) {
                client.cache.reset()
                this.user = {}
                AsyncStorage.removeItem('email')
                AsyncStorage.removeItem('password')
                AsyncStorage.removeItem('id')

                this.setState({loggedIn:false,view:"unAuthorizedRouter",user:{}})
            }
        })

    }
    handleSignUp(signUp){
        this.setState({loggedIn:true,view:"onBoardRouter"})
        this.navigate("onBoard")
    }
    handleOnBoard(onBoard){
        this.navigate("home")
    }
    render(){
        console.log("rendering for",this.state.view)
        if(this.state.view === "unAuthorizedRouter"){
            return(
                <UnAuthorizedRouter
                    navigate={this.navigate}
                    onLogin={this.handleLogin}
                    onSignUp={this.handleSignUp}
                />
            )
        }
        else if(this.state.view === "onBoardRouter"){
            return null
            // return(
            //     <OnBoardRouter
            //         navigate={this.navigate}
            //         onOnBoard={this.handleOnBoard}
            //     />
            // )
        }
        else if(this.state.view === "home"){
            return(
                <MainRouter
                    navigate={this.navigate}
                    handleLogout={this.handleLogout}
                />
            )
        }
        else{
            return(
                <Text>Invalid RootRouter View</Text>
            )
        }
    }

}
