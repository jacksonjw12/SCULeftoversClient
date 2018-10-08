import React, {Component} from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Feed from './Routes/Feed'
import Compose from './Routes/Compose'
import Settings from './Routes/Settings'

export default class MainRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            view:"feed"
        }
        this.navigate = this.navigate.bind(this)
    }
    navigate(location){
        this.setState({view:location})

    }
    renderView(){
        console.log("main rendering for",this.state.view);
        if(this.state.view === "feed"){
            return(
                <Feed
                    navigate={this.navigate}
                />
            )
        }
        else if(this.state.view === "compose"){
            return(
                <Compose
                    navigate={this.navigate}

                />
            )

        }
        else if(this.state.view === "settings"){
            return(
                <Settings
                    navigate={this.navigate}
                    onLogout={this.props.handleLogout}
                />
            )
        }
        else{
            return(
                <Text>Invalid MainRouter View</Text>
            )
        }
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{height:"90%",backgroundColor:"white"}}>{this.renderView()}</View>
                <View style={{height:"10%",flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>this.navigate("compose")} style={{backgroundColor:"red",flex:1}} />
                    <TouchableOpacity onPress={()=>this.navigate("feed")} style={{backgroundColor:"green",flex:1}} />
                    <TouchableOpacity onPress={()=>this.navigate("settings")} style={{backgroundColor:"blue",flex:1}} />
                </View>
            </View>
        )
    }


}
