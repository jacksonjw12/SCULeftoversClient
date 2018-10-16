import React, {Component} from 'react';
import { Button,View,Image,ImageBackground,TouchableOpacity,Text } from 'react-native';
import RNCameraScreen from './Routes/Camera';
import Compose from './Routes/Compose';
import Icon from "./Common/Icon";
  
//#9d2235

export default class ComposeRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            view:"Compose",
            pictureURI: ''
        }
        this._handlePictureTaken = this._handlePictureTaken.bind(this)
        this.navigate = this.navigate.bind(this)
    }

    navigate(location){
        this.setState({view:location})
    }

    _handlePictureTaken = (pictureLocation) => {
        console.log('pic loc:', pictureLocation);
        this.setState({pictureURI: pictureLocation});
      }

    render(){
        if (this.state.view === 'Compose') {
            if (this.state.pictureURI === '') {
                return (
                    <View style={{flex:1,alignItems:'center'}}>
                        <View style={{height:"40%",backgroundColor:"white", justifyContent: 'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.navigate("Camera")} 
                            style={{backgroundColor:"white",flex:1}}>  
                                <Text style={{top: 75, textAlign: 'center'}}>Add a picture</Text>
                                <Icon icon={"compose"} />
                            </TouchableOpacity>
                        </View>
                        <Compose/>
                    </View>
                )
            } else {
                return(
                    <View style={{flex:1,alignItems:'center'}}>
                        <View style={{height:"40%",backgroundColor:"white", justifyContent: 'center'}}>
                            <ImageBackground
                                style={{width: 250, height: 250}}
                                source={{uri: this.state.pictureURI}}
                                >
                                <View style={{position: 'absolute',right: 5,top: 5}}>
                                    <Button
                                        title="x"
                                        onPress={() => {
                                            this.navigate('Compose');
                                            this._handlePictureTaken('');
                                        }}
                                    />  
                                </View>
                            </ImageBackground>
                        </View>
                        <Compose/>
                    </View>
                )
            }
        } else if (this.state.view === 'Camera') {
            return (
                <View style = {{flex:1}}>
                    <RNCameraScreen
                        navigate={this.navigate}
                        _handlePictureTaken={this._handlePictureTaken}
                    />
                    <Button
                        title="Back"
                        onPress={() => 
                            this.navigate('Compose')
                        }
                    />
                </View>

            )
        } else if (this.state.view === 'Picture') {
            return (
                <View style={{flex:1}}>
                    <ImageBackground
                        style={{flex: 1, resizeMode: 'cover'}}
                        source={{uri: this.state.pictureURI}}
                    >
                    <View style={{position: 'absolute',left: 5,top: 5}}>
                    <Button
                        title="<"
                        onPress={()=> {
                            this.navigate('Camera')
                            this._handlePictureTaken('')
                        }}
                    />
                    </View>
                    <View style={{position: 'absolute',right: 5,top: 5}}>
                        <Button
                            title="Add photo"
                            onPress={() =>
                                this.navigate('Compose')
                            }
                        />
                    </View>
                    </ImageBackground>
                </View>
            )
        }
    }


}