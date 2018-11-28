import React, {Component} from 'react';
import {Button, ImageBackground,ScrollView,Picker,FlatList,StyleSheet,Text,TouchableOpacity, TextInput, View,Platform} from 'react-native';
import Icon from "../Common/Icon";
import SubmitPost from '../../apollo/submitPost';
import { TextField } from 'react-native-material-textfield';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class Compose extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            title: '',
            expireTime: "4",
            location: "Location A",
            allergens: [],


            locationMenuFocus:false,
            expireMenuFocus:false,

        }
        this.allergens = [{key:0,name:"wheat",color:"gold"},{key:1,name:"peanuts",color:"brown"},{key:2,name:"gluten free",color:"green"},{key:3,name:"dairy",color:"grey"},{key:4,name:"test",color:"purple"},{key:5,name:"test2",color:"blue"}]
        this.initialRender = true;
        this.getPostData = this.getPostData.bind(this)
    }
    getPostData(){
        let post = {ready:false,title:this.state.title,expireTime:this.state.expireTime,location:this.state.location,allergens:this.state.allergens}
        if( this.getErrors() === undefined ){
            post.ready = true
            post.allergens.sort()
        }
        else{
          this.setState({title:this.state.title})
        }

        console.log(post)

        return post
    }

    // addTag() {
    //     if(this.state.tagText != ''){
    //         this.setState(prevState => ({
    //             tags: [...prevState.tags, this.state.tagText]
    //         }))
    //         this.setState({tagText: ''})
    //         this.tagInput.clear();
    //     }
    //     console.log(this.state.tags);
    // }
    //
    // deleteTag(index) {
    //     var array = [...this.state.tags]; // make a separate copy of the array
    //     array.splice(index, 1);
    //     this.setState({tags: array});
    // }
    getErrors(){
      if(this.state.title.trim().length === 0){
        return "Should not be empty"
      }
      else if(this.state.title.length > 20){
        return "Title is too long"
      }
      return undefined
    }

    toggleAllergen(key){
      let index = this.state.allergens.indexOf(key)
      if(index > -1){
        this.setState(prevState => {
            prevState.allergens.splice(index,1)
            return({allergens: prevState.allergens})
        })
      }
      else{
        this.setState(prevState => ({
          allergens: [...prevState.allergens, key]
        }))
      }


    }
    setExpireMenuRef = ref => {
        this._expireMenu = ref;
    };

    hideExpireMenu = () => {

        this._expireMenu.hide();
        this.setState({expireMenuFocus:false})

    };

    showExpireMenu = () => {
        //this.expireMenuFocus = true
        this._expireMenu.show();
        this.setState({expireMenuFocus:true})
    };
    setLocationMenuRef = ref => {
        this._locationMenu = ref;
    };


    hideLocationMenu = () => {
        //this._locationMenuText.classList.remove('highlightFocus')
        //this.locationMenuFocus = false
        this._locationMenu.hide();
        this.setState({locationMenuFocus:false})
    };

    showLocationMenu = () => {
        //this._locationMenuText.classList.add('highlightFocus')
        //this.locationMenuFocus = true

        // console.log(this._locationMenuText)
        this._locationMenu.show();
        this.setState({locationMenuFocus:true})
    };


    render() {

        let picture;
        if (this.props.pictureURI === ''){
            this.props.navigateCompose("Camera")
            //should never get to here
        } else {
            picture =
                <ImageBackground
                    style={{width: 90, height: 160}}
                    source={{uri: this.props.pictureURI}}
                 />

        }
        let error = this.initialRender?undefined:this.getErrors();
        this.initialRender = false;

        if(!this.props.show){
            return null
        }
        return (
            <View style={{flex:1,alignItems:'center'}}>

                <View style={{alignItems:'center',position: 'absolute'}}>

                    {/*  The image, and back button  */}
                    <View style={{flexDirection:"row",width:"100%",height:"35%"}}>
                        <View style={{flexGrow:1,justifyContent:'center'}}>
                            <TouchableOpacity  onPress={()=>this.props.navigateCompose("Camera")}>
                                <Icon icon={"backArrow"} size={1} color={"black"}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:"white", justifyContent: 'center',flexGrow:0}}>
                            {picture}
                        </View>
                        <View style={{flexGrow:1}}>
                            <Icon icon={"backArrow"} size={1} color={"white"}/>
                            {/* invisible symmetrical back arrow cheat for centering*/}
                        </View>
                    </View>

                    {/*  Title Input  */}
                    <View style={{height:90,width:"100%"}}>
                        <TextField
                            label='Title'
                            value={this.state.title}
                            textColor={"black"}
                            tintColor={"#9d2235"}
                            style={{}}
                            error={error}

                            onChangeText={ (t) => this.setState({ title:t}) }
                        />
                    </View>

                    {/*  Expire Time Input  */}
                    <View style={{padding: 5, width:"100%", height: 50,flexDirection:'row', fontSize:16,alignItems:'center'}}>
                        <Text  style={{fontSize:16, paddingRight: 5, justifyContent:'center',color:this.state.expireMenuFocus?'#9d2235':'#8f8f8f'}}>Expires in:</Text>
                        <Menu
                            ref={this.setExpireMenuRef}
                            button={
                                <View style={styles.shadowMenuContainer}>
                                    <TouchableOpacity
                                        style = {{height: 48,justifyContent: 'center',maxWidth: 248,minWidth: 124,}}
                                        onPress={this.showExpireMenu}>
                                        <Text style={{fontSize: 14,fontWeight: '400',paddingHorizontal: 16,}}>{this.state.expireTime} Hrs</Text>
                                    </TouchableOpacity>
                                </View>}
                        >
                            <MenuItem onPress={()=>{this.hideExpireMenu();this.setState({expireTime:4})}}>4 Hrs</MenuItem><MenuDivider />
                            <MenuItem onPress={()=>{this.hideExpireMenu();this.setState({expireTime:8})}}>8 Hrs</MenuItem><MenuDivider />
                            <MenuItem onPress={()=>{this.hideExpireMenu();this.setState({expireTime:12})}}>12 Hrs</MenuItem><MenuDivider />
                            <MenuItem onPress={()=>{this.hideExpireMenu();this.setState({expireTime:24})}}>24 Hrs</MenuItem>
                        </Menu>
                    </View>

                    {/*  Location Input  */}
                    <View style={{padding: 5, width:"100%", height: 50,flexDirection:'row', fontSize:16,alignItems:'center'}}>
                          <Text  style={{fontSize:16, paddingRight: 5, justifyContent:'center',color:this.state.locationMenuFocus?'#9d2235':'#8f8f8f'}}>Location: &nbsp;</Text>
                          <Menu
                            ref={this.setLocationMenuRef}
                            button={
                                <View style={styles.shadowMenuContainer}>
                                    <TouchableOpacity
                                        style = {{height: 48,justifyContent: 'center',maxWidth: 248,minWidth: 124,}}
                                        onPress={this.showLocationMenu}>
                                        <Text style={{fontSize: 14,fontWeight: '400',paddingHorizontal: 16,}}>{((this.state.location === null)?"Location":this.state.location)}</Text>
                                    </TouchableOpacity>
                                </View>}
                        >
                              <MenuItem onPress={()=>{this.hideLocationMenu();this.setState({location:"Location A"})}}>Location A</MenuItem><MenuDivider />
                              <MenuItem onPress={()=>{this.hideLocationMenu();this.setState({location:"Location B"})}}>Location B</MenuItem><MenuDivider />
                              <MenuItem onPress={()=>{this.hideLocationMenu();this.setState({location:"Location C"})}}>Location C</MenuItem><MenuDivider />
                              <MenuItem onPress={()=>{this.hideLocationMenu();this.setState({location:"Location D"})}}>Location D</MenuItem>
                          </Menu>
                      </View>

                    <View style={{marginTop:10,padding: 5, width:300, height: 175, justifyContent:'center'}}>
                        <Text  style={{fontSize:16, paddingRight: 5, justifyContent:'center',color:'#8f8f8f'}}>Food Allergens/Tags</Text>
                      <View style={{...styles.shadowMenuContainer}}>
                        <FlatList
                            style={{marginTop:5,padding:5,flexGrow:1,...styles.shadowMenuContainer}}
                            data={this.allergens}
                            numColumns={2}
                            renderItem={({item}) =>
                                <View style={{width:"50%",height:60,padding:5,}}>
                                    <View style={{...styles.shadowMenuContainer2,flexGrow:2,borderWidth:(this.state.allergens.indexOf(item.key) > -1)?1:0,borderColor:item.color}}>
                                        <TouchableOpacity onPress={()=>this.toggleAllergen(item.key)} style={{flexGrow:1,textAlign:'center',alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{color:"black"}}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>}
                        />
                      </View>

                    </View>

                    <View style={{marginTop:25,padding: 5, height: 50, justifyContent:'center'}}>
                        <SubmitPost
                            pictureURI = {this.props.pictureURI}
                            navigate={this.props.navigate}
                            handlePost={this.props._handlePictureSubmission}
                            getPostData={this.getPostData}
                        />

                    </View>
                </View>
            </View>
        );
    }};

const styles = StyleSheet.create({
    shadowMenuContainer: {
        // position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 4,
        // opacity: 0,

        // Shadow
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.28,
                shadowRadius: 2,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    shadowMenuContainer2: {
        // position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 4,
        // opacity: 0,

        // Shadow
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.28,
                shadowRadius: 2,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    highlightFocus: {
      color:'#9d2235',
    },
    highlightUnFocus: {
      color:"#8f8f8f",
    },
    plusButton: {
        alignSelf:'center',
        textAlign:'center',
        backgroundColor: '#fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'black',
        height:50,
        width:50,
        fontSize:20,
        //     // top: 12
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
        color:'#000',
        textAlign:'center',
        // paddingTop:5,
        fontSize:15
    },
    tagItem: {
        marginRight:5,
        marginLeft:5,
        marginTop:5,
        paddingTop:5,
        paddingBottom:5,
        // paddingRight:20,
        backgroundColor: '#ffffff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'gray',
        height:40,
        minWidth:50,
        top: 12,
        flexDirection:"row",
        justifyContent:"space-between"
    }
});
