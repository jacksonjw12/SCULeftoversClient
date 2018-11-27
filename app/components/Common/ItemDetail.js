import React, {Component} from 'react';
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity,} from 'react-native';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";
//not used, will be used to do mutations on the post
export default class ItemDetailComponent extends Component {
    constructor(props){
        super(props)
        this.state = {...this.state,
            loaded:false,
            expanded:false,
        }
    }

    render() {
    
        return(
            <View  style={{
                width:"100%",
                backgroundColor:"transparent",
                height:"100%",
                alignItems:'center',
                marginTop:40

            }}>
                <ImageBackground 
                    source={{uri: this.props.item.pictureURL}}
                    style={{width:"100%", height:"80%", resizeMode:'contain'}}
                    >
                    <TouchableOpacity style={styles.backButton} 
                        onPress={ () => {
                            this.props.expand(false);
                            }}>
                        <Text style={{color:'white'}}> Close </Text>
                    </TouchableOpacity>
                </ImageBackground>
                <Text style={styles.postTitle}>{this.props.item.title}</Text>
            </View>
        )
        

    }
}

// const ItemDetail = compose(
//     graphql(GET_POST, {name: 'getPost'}),
// )(ItemDetailComponent)
// export default ItemDetailComponent



const styles = StyleSheet.create({
    container: {
        width:"100%",


        backgroundColor:"transparent"
    },
    innerContainer:{
        position:'relative',
        marginLeft:"6%",
        marginRight:"6%",
        marginTop:"10%",
        // height:"60%",
        flex: 1,
        borderRadius:20,
        // borderColor:"black",
        // borderWidth:1,
        shadowOffset:{  width: 0,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:"transparent",
        zIndex:6
    },
    postImage: {
        width:"100%",
        height:"100%",
        marginTop:0,
        zIndex:1,
        borderRadius:20,
        overflow:'hidden'
    },
    postTitleBar: {
        // position:'absolute',
        // bottom:0,
        // left:0,
        // backgroundColor:'white',
        // width:"100%",
        // height:"20%",
        // borderBottomLeftRadius:20,
        // borderBottomRightRadius:20,
        // zIndex:10,
        // opacity:.9,
        // flex:1,
        // alignItems:'center'
    },
    postTitle: {
        fontSize:20,
        bottom:100
    },
    postTouch: {
        position:'absolute',
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor:'transparent',
        flex:1
    },
    backButton: {
        height: 40,
        width: 100,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
})
