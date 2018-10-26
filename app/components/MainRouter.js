import React, {Component} from 'react';
import { Text,View,TouchableOpacity,Image, StyleSheet } from 'react-native';
import FeedRouter from './FeedRouter'
import Compose from './Routes/Compose'
import Settings from './Routes/Settings'
import Icon from "./Common/Icon";
import ComposeRouter from './ComposeRouter';

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
                <View style={{height:"92%",backgroundColor:"white"}}>{this.renderView()}</View>
                <View style={{height:"8%",flexDirection:"row", borderTopColor:"black",borderTopWidth:1}}>
                    <TouchableOpacity onPress={()=>this.navigate("compose")} style={{backgroundColor:"white",flex:1}}>
                        <Icon icon={"compose"} color={this.state.view === "compose" ? "#9d2235":undefined} size={60}/>
                        {/*<Image style={styles.bottomIcon} source={require('../images/compose.png')} />*/}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigate("feed")} style={{backgroundColor:"white",flex:1}} >
                        <Icon icon={"feed"} color={this.state.view === "feed" ? "#9d2235":undefined} size={50}/>
                        {/*<Image style={styles.bottomIcon} source={require('../images/home.png')} />*/}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigate("settings")} style={{backgroundColor:"white",flex:1}} >
                        <Icon icon={"settings"} color={this.state.view === "settings" ? "#9d2235":undefined} size={50}/>
                        {/*<Image style={styles.bottomIcon} source={require('../images/settings.png')} />*/}
                    </TouchableOpacity>
                </View>
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
