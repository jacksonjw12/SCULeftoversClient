import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Modal,TouchableOpacity,TouchableHighlight} from 'react-native';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";

import ItemDetailComponent from './ItemDetail';
//not used, will be used to do mutations on the post
const GET_POST = gql`
query getPost{
  getFeed{
    id
    title
    pictureURL
  }
}`

class FeedItemComponent extends Component {
    constructor(props){
        super(props)
        this.state = {...this.state,
            loaded:false,
            expanded:false
        }
        this.expand = this.expand.bind(this);
    }

    expand(expanded) {
        console.log('hi')
        this.setState({expanded: expanded});
    }
    render() {
        const postHeight = .5 * this.props.dimensions.height;
        if(!this.props.show){
            return null
        }
        if(!this.state.loaded){
            //show template
            console.log(this.props.dimensions)
            return(

                <View style={{...styles.container,height:postHeight}}>
                     {/*<View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>*/}
                    {/*<View style={{flex:1,justifyContent:'center'}}><Text>Loading...</Text></View>*/}
                {/*</View>*/}
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.expanded}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <ItemDetailComponent item={this.props.item} expand={this.expand}/>
                        
                    </Modal>
                                
                    <View style={styles.innerContainer}>
                        <TouchableOpacity 
                            onPress={()=>{this.expand(!this.state.expanded)}} 
                            style={styles.postTouch}>
                            {/* <View> */}
                                <Image style={styles.postImage} source={{uri: this.props.item.pictureURL,width:32,height:32}}  />
                            {/* </View> */}
                            <View style={{...styles.postTitleBar,shadowOffset:{  width: 0,  height: 2,  },
                                shadowColor: 'black',
                                shadowOpacity: 0.5,}}>
                                <Text style={styles.postTitle}>{this.props.item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
        // let feedItems = []
        // this.props.getFeed.getFeed.forEach((f,i)=>{
        //     console.log(f)
        //     feedItems.push((
        //         <View key={i}>
        //             <Text>{f.title}</Text>
        //             <Image source={{uri: f.pictureURL,height:100,width:100}} onLoadStart={(e)=>console.log("loading")} />
        //         </View>
        //     ))
        // })
        // return (
        // <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        //     {/*<View style={{flex:1,justifyContent:'center'}}><Text>Feed!</Text></View>*/}
        //     {/*<View key={0}>*/}
        //         {/*<Text>{this.props.getFeed.getFeed[0].title}</Text>*/}
        //         {/*<Image source={{uri: 'http://i.imgur.com/vKRaKDX.png',width:32,height:32}} onLoadStart={(e)=>console.log("loading")} />*/}
        //     {/*</View>*/}
        //     {feedItems}
        // </View>
        // );

    }
}

const FeedItem = compose(
    graphql(GET_POST, {name: 'getPost'}),
)(FeedItemComponent)
export default FeedItem



const styles = StyleSheet.create({
    container: {
        width:"100%",


        backgroundColor:"transparent"
    },
    innerContainer:{
        position:'relative',
        marginLeft:"10%",
        marginRight:"10%",
        marginTop:"10%",
        // height:"60%",
        flex: 1,
        borderRadius:20,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:"black",
        zIndex:6
    },
    postImage: {
        width:"100%",
        height:"90%",
        marginTop:0,
        zIndex:1,
        resizeMode: 'contain',
        borderRadius:20,
        overflow:'hidden'
    },
    postTitleBar: {
        position:'absolute',
        bottom:-15,
        left:0,
        backgroundColor:'white',
        width:"100%",
        height:"15%",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        zIndex:10,
        // opacity:.9,
        flex:1,
        alignItems:'center',
        // shadowOffset:{  width: 0,  height: 2,  },
        // shadowColor: 'black',
        // shadowOpacity: 0.5,
    },
    postTitle: {
        paddingTop:10,
        fontSize:20,
    },
    postTouch: {
        position:'absolute',
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor:'transparent',
        flex:1
    }
})
