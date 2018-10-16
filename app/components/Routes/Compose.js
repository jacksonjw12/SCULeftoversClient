import React, {Component} from 'react';
import {Button, ImageBackground,Text,TouchableOpacity, TextInput, View} from 'react-native';
import Icon from "../Common/Icon";
export default class Compose extends React.Component {
  state = {
    title: '',
    description: '',
    tags: []
  }

  render() {
    let picture;
    if (this.props.pictureURI === ''){
      picture = <View style={{height:"45%",backgroundColor:"white", justifyContent: 'center'}}>
                    <TouchableOpacity 
                    onPress={()=>this.props.navigate("Camera")} 
                    style={{backgroundColor:"white",flex:1}}>  
                        <Text style={{top: 75, textAlign: 'center'}}>Add a picture</Text>
                        <Icon icon={"compose"} />
                    </TouchableOpacity>
                </View>;
    } else {
      picture = <View style={{height:"45%",backgroundColor:"white", justifyContent: 'center'}}>
                  <ImageBackground
                      style={{width: 200, height: 200}}
                      source={{uri: this.props.pictureURI}}
                      >
                      <View style={{position: 'absolute',right: 5,top: 5}}>
                          <Button
                              title="x"
                              onPress={() => {
                                  this.props.navigate('Compose');
                                  this.props._handlePictureTaken('');
                              }}
                          />  
                      </View>
                  </ImageBackground>
                </View> ;
    }
    return (
      <View style={{alignItems:'center'}}>
        {picture}
        <View style={{padding: 5, width:100, height: 75, justifyContent:'center'}}>
          <TextInput 
            style={{height: 30, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
            value={this.state.text}
            onChangeText={(title) => this.setState({title})} 
            placeholder="Title"/>
        </View>
        <View style={{padding: 5, width:200, height: 100, justifyContent:'center'}}>
          <TextInput 
            style={{height: 100, width: 200, borderColor: 'gray', borderWidth:1,alignSelf: 'center',textAlign: 'center'}}
            maxLength = {150}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(description) => this.setState({description})}
            placeholder="Description!"/>
        </View>
        <View style={{padding: 5, width:200, height: 100, justifyContent:'center'}}>
          <Text style={{textAlign:'left'}}>Tags:</Text>
        </View>
        <TouchableOpacity
          style={{marginRight:40,
            marginLeft:40,
            marginTop:10,
            paddingTop:10,
            paddingBottom:10,
            backgroundColor: '#9d2235',
            borderRadius:10,
            borderWidth: 1,
            borderColor: 'gray',
            width: 100}}
        >
          <Text style={{color:'#fff',textAlign:'center',paddingLeft : 10,paddingRight : 10}}>Submit</Text>
        </TouchableOpacity>

        
      </View>
    );
  }
  }
