import React, {Component} from 'react';
import { Text,View,TouchableOpacity,Image, StyleSheet } from 'react-native';
import FeedRouter from './FeedRouter'
import Compose from './Routes/Compose'
import Settings from './Routes/Settings'
import Icon from "./Common/Icon";
import ComposeRouter from './ComposeRouter';
import NavBar from './Common/NavBar'

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

            return(
                <View style={{flex:1}}>
                <FeedRouter
                    show={this.state.view === 'feed'}
                    navigate={this.navigate}
                />
                <ComposeRouter
                    show={this.state.view === "compose"}
                    navigate={this.navigate}
                />
                <Settings
                    show={this.state.view === "settings"}
                    navigate={this.navigate}
                    onLogout={this.props.handleLogout}
                />
                </View>
            )




    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{height:"100%",backgroundColor:"white"}}>{this.renderView()}</View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    bottomIcon: {
        flex:1,
        width:50,
        height:50,


    }
})
