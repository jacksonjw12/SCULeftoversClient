import React, {Component} from 'react';
import { Button,View,Image,ImageBackground,TouchableOpacity,Text } from 'react-native';
import RNCameraScreen from './Routes/Camera';
import Compose from './Routes/Compose';
import Icon from "./Common/Icon";
import NavBar from "./Common/NavBar";


//#9d2235

export default class ComposeRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            view:"Camera",
            pictureURI: ''
        }
        this._handlePictureTaken = this._handlePictureTaken.bind(this)
        this._handlePictureSubmission = this._handlePictureSubmission.bind(this)
        this.navigateCompose = this.navigateCompose.bind(this)
    }

    navigateCompose(location){
        this.setState({view:location})
    }

    _handlePictureTaken = (pictureLocation) => {
        console.log('pic loc:', pictureLocation);
        this.setState({pictureURI: pictureLocation});
      }

    _handlePictureSubmission = () => {
        this.setState({pictureURI: ''})
    }

    render(){
        // let picture;
        if (this.state.view === 'Compose') {
            return(

                <Compose
                    show={this.props.show}
                    navigateCompose={this.navigateCompose}
                    navigate={this.props.navigate}
                    pictureURI={this.state.pictureURI}
                    _handlePictureTaken={this._handlePictureTaken}
                    _handlePictureSubmission={this._handlePictureSubmission}
                    client={this.props.client}
                />

            )
        } else if (this.state.view === 'Camera') {
            if(!this.props.show){
                return null
            }
            else{
                return (
                    <View style = {{flex:1}}>
                        <RNCameraScreen
                            navigate={this.navigateCompose}
                            _handlePictureTaken={this._handlePictureTaken}
                        />
                        <NavBar view={'compose'} navigate={this.props.navigate} />

                    </View>

                )
            }

        } else if (this.state.view === 'Picture') {
            if(!this.props.show){
                return null
            }
            return (
                <View style={{flex:1}}>
                    <ImageBackground
                        style={{width:'100%',height:'100%', resizeMode: 'cover'}}
                        source={{uri: this.state.pictureURI}}
                    >
                    <View style={{position: 'absolute',left:20,top:20}}>
                        {/*<Button*/}
                            {/*title="X"*/}
                            {/*onPress={()=> {*/}
                                {/*this.navigateCompose('Camera')*/}
                                {/*this._handlePictureTaken('')*/}
                            {/*}}*/}
                            {/*color="#9d2235"*/}
                        {/*/>*/}
                        <TouchableOpacity
                            style={{
                                // paddingTop:10,
                                // paddingBottom:10,
                                backgroundColor: 'transparent',
                                borderRadius:25,
                                borderWidth: 1,
                                borderColor: 'transparent',
                                width:50,
                                height:50
                            }}
                            onPress={()=> {
                                this.navigateCompose('Camera')
                                this._handlePictureTaken('')
                            }}>
                            <Text style={{color:'#fff',fontSize:30,textAlign:'center',paddingLeft : 10,paddingRight : 10}}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: 'absolute',right: 20,bottom: 20}}>
                        <TouchableOpacity
                            style={{



                                backgroundColor: '#fff',
                                borderRadius:10,
                                borderWidth: 1,
                                borderColor: 'gray',
                                width: 75}}
                            onPress={() =>
                                this.navigateCompose('Compose')
                            }>
                            <Text style={{color:'#9d2235',fontSize:35,textAlign:'center',paddingLeft : 10,paddingRight : 10}}>&rarr;</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                </View>
            )
        }
    }


}
