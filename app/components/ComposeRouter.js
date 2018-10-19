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
        // let picture;
        if (this.state.view === 'Compose') {
            return(
                <View style={{flex:1,alignItems:'center'}}>
                    <Compose
                        navigate={this.navigate}
                        pictureURI={this.state.pictureURI}
                        _handlePictureTaken={this._handlePictureTaken}
                    />
                </View>
            )
        } else if (this.state.view === 'Camera') {
            return (
                <View style = {{flex:1}}>
                    <RNCameraScreen
                        navigate={this.navigate}
                        _handlePictureTaken={this._handlePictureTaken}
                    />
                </View>

            )
        } else if (this.state.view === 'Picture') {
            return (
                <View style={{flex:1}}>
                    <ImageBackground
                        style={{width:'100%',height:'100%', resizeMode: 'cover'}}
                        source={{uri: this.state.pictureURI}}
                    >
                    <View style={{position: 'absolute'}}>
                        <Button
                            title="X"
                            onPress={()=> {
                                this.navigate('Camera')
                                this._handlePictureTaken('')
                            }}
                            color="#9d2235"
                        />
                    </View>
                    <View style={{position: 'absolute',right: 5,top: 20}}>
                        <TouchableOpacity
                            style={{marginRight:10,
                                marginLeft:40,
                                marginTop:10,
                                paddingTop:10,
                                paddingBottom:10,
                                backgroundColor: '#9d2235',
                                borderRadius:10,
                                borderWidth: 1,
                                borderColor: 'gray',
                                width: 100}}
                            onPress={() =>
                                this.navigate('Compose')
                            }>
                            <Text style={{color:'#fff',textAlign:'center',paddingLeft : 10,paddingRight : 10}}>Add Photo</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                </View>
            )
        }
    }


}