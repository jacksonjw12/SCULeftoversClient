import React, {Component} from 'react';
import {Button, ImageBackground,ScrollView,StyleSheet,Text,TouchableOpacity, TextInput, View} from 'react-native';
import Icon from "../Common/Icon";
import SubmitPost from '../../apollo/submitPost';

export default class Compose extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        ...this.state,
        title: '',
        description: '',
        tags: [],
        tagText: ''
    }
  }

  addTag() {
    if(this.state.tagText != ''){
      this.setState(prevState => ({
        tags: [...prevState.tags, this.state.tagText]
      }))
      this.setState({tagText: ''})
      this.tagInput.clear();
    }
    console.log(this.state.tags);
  }

  deleteTag(index) {
    var array = [...this.state.tags]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({tags: array});
  }



  render() {
    let picture;
    console.log('pictureURI1: ', this.props.pictureURI);
    if (this.props.pictureURI === ''){
      picture =
                <TouchableOpacity
                  onPress={()=>this.props.navigateCompose("Camera")}
                  style={{backgroundColor:"white",flex:1}}>
                    <Text style={{top:50, textAlign: 'center', color:'#9d2235'}}>Add a picture</Text>
                    <Icon icon={"compose"} />
                </TouchableOpacity>;
    } else {
      picture =
                <ImageBackground
                    style={{width: 90, height: 160}}
                    source={{uri: this.props.pictureURI}}
                    >
                    <View style={{position: 'absolute',right: 5,top: 5}}>
                        <Button
                            title="x"
                            onPress={() => {
                                this.props.navigateCompose('Compose');
                                this.props._handlePictureTaken('');
                            }}
                            color="#9d2235"
                        />
                    </View>
                </ImageBackground>;
    }

    var tags = [];
    if (this.state.tags && this.state.tags.length > 0){
      for(let i = 0; i < this.state.tags.length; i++){
        tags.push(
          <TouchableOpacity style={styles.tagItem}>
          <View style={{position: 'absolute', right: 0, top: 1}}>
                        <Button
                            title="x"
                            onPress={()=> {
                              this.deleteTag(i);
                            }}
                            color="#9d2235"
                        />
                    </View>
            <Text style={styles.buttonText}>{this.state.tags[i]}</Text>
          </TouchableOpacity>);
      }
    }
    if(!this.props.show){
        return null
    }
    return (
        <View style={{flex:1,alignItems:'center'}}>

      <View style={{alignItems:'center',position: 'absolute'}}>
        <View style={{height:"40%",backgroundColor:"white", justifyContent: 'center'}}>
          {picture}
        </View>
        <View style={{padding: 5, top:5,width:100, height: 75, justifyContent:'center'}}>
          <TextInput
            style={{top:5,height: 30, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
            value={this.state.text}
            onChangeText={(title) => this.setState({title})}
            placeholder="Title"/>
        </View>
        <View style={{padding: 5, width:200, height: 100, justifyContent:'center'}}>
          <TextInput
            style={{height: 100, width: 200, top:5, borderColor: 'gray', borderWidth:1,textAlign: 'center'}}
            maxLength = {150}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(description) => this.setState({description})}
            placeholder="Description!"/>
        </View>
        <View style={{padding: 5, width:300, height: 75, justifyContent:'center', flexDirection:'row'}}>
          <TextInput
            style={{height: 30, width:300, borderColor: 'gray', borderWidth: 1, alignSelf: 'center',textAlign: 'center'}}
            value={this.state.text}
            onChangeText={(tagText) => this.setState({tagText})}
            placeholder="Tag item here! e.g. allergens, exp date, etc."
            ref={input => { this.tagInput = input }}/>
          <TouchableOpacity
            style = {styles.plusButton}
            onPress={this.addTag.bind(this)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 5, height: 50, justifyContent:'center', flexDirection:'row'}}>
          <Text>Tags:</Text>
          {tags}
        </View>
        <View style={{marginTop:50,padding: 5, height: 50, justifyContent:'center'}}>
          <SubmitPost
            pictureURI = {this.props.pictureURI}
            navigate={this.props.navigate}
          />

        </View>
      </View>
        </View>
    );
  }};

const styles = StyleSheet.create({
  plusButton: {
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#9d2235',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'gray',
    height:30,
    top: 12
  },
  submitButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: '#9d2235',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'gray',
    bottom: 5,
    width: 100,
    height:40
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  tagItem: {
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#ADD8E6',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'gray',
    height:30,
    top: 12
  }
});
