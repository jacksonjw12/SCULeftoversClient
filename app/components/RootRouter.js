import React, {Component} from 'react';
import { Text } from 'react-native';
import UnAuthorizedRouter from './UnAuthorizedRouter'
import MainRouter from './MainRouter'
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
    }
    navigate(location){
        if(this.state.loggedIn){
            this.setState({view:location})
        }

    }
    handleLogin(id,email,verified=false,onBoarded=true){
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
    handleLogout(logout){
        this.setState({loggedIn:false})

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
