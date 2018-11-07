import React, {Component} from 'react';
import {View,TouchableOpacity, StyleSheet } from 'react-native';

import Icon from "./Icon";

export default class NavBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            view:this.props.view
        }
    }


    render(){

        if(this.state.view !== 'compose'){
            return (

                <View style={{height:"8%",flexDirection:"row", borderTopColor:"black",borderTopWidth:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigate("compose")} style={{backgroundColor:"white",flex:1}}>
                            <Icon icon={"compose"} color={this.state.view === "compose" ? "#9d2235":undefined} size={60}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/compose.png')} />*/}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigate("feed")} style={{backgroundColor:"white",flex:1}} >
                            <Icon icon={"feed"} color={this.state.view === "feed" ? "#9d2235":undefined} size={50}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/home.png')} />*/}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigate("settings")} style={{backgroundColor:"white",flex:1}} >
                            <Icon icon={"settings"} color={this.state.view === "settings" ? "#9d2235":undefined} size={50}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/settings.png')} />*/}
                        </TouchableOpacity>
                    </View>
            )
        }
        else{
            return (
                <View style={{flex:1,position:'absolute',bottom:0,left:0,width:"100%",height:'8%'}}>
                <View style={{height:'100%',flexDirection:"row",borderTopColor:"transparent",borderTopWidth:1}}>
                        <TouchableOpacity onPress={()=>this.props.navigate("compose")} style={{backgroundColor:"transparent",flex:1}}>
                            <Icon icon={"compose"} color={this.state.view === "compose" ? "#9d2235":undefined} size={60}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/compose.png')} />*/}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigate("feed")} style={{backgroundColor:"transparent",flex:1}} >
                            <Icon icon={"feed"} color={this.state.view === "feed" ? "#9d2235":undefined} size={50}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/home.png')} />*/}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigate("settings")} style={{backgroundColor:"transparent",flex:1}} >
                            <Icon icon={"settings"} color={this.state.view === "settings" ? "#9d2235":undefined} size={50}/>
                            {/*<Image style={styles.bottomIcon} source={require('../images/settings.png')} />*/}
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }


}
