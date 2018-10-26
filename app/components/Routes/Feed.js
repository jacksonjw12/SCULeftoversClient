import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";
const GET_FEED = gql`
query getFeed{
  getFeed{
    id
    title
    pictureURL
  }
}`
class FeedComponent extends Component {
    constructor(props){
        super(props)
        this.state = {...this.state,
        loading:[]
        }
    }

    render() {
        if(!this.props.show){
            return null
        }
        if(this.props.getFeed.loading){
            return(
                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{flex:1,justifyContent:'center'}}><Text>Loading...</Text></View>
                </View>
            )
        }
        let feedItems = []
        this.props.getFeed.getFeed.forEach((f,i)=>{
            console.log(f)
            feedItems.push((
                <View key={i}>
                    <Text>{f.title}</Text>
                    <Image source={{uri: f.pictureURL,height:100,width:100}} onLoadStart={(e)=>console.log("loading")} />
                </View>
            ))
        })
        return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            {/*<View style={{flex:1,justifyContent:'center'}}><Text>Feed!</Text></View>*/}
            {/*<View key={0}>*/}
                {/*<Text>{this.props.getFeed.getFeed[0].title}</Text>*/}
                {/*<Image source={{uri: 'http://i.imgur.com/vKRaKDX.png',width:32,height:32}} onLoadStart={(e)=>console.log("loading")} />*/}
            {/*</View>*/}
            {feedItems}
        </View>
        );

    }
}

const Feed = compose(
    graphql(GET_FEED, {name: 'getFeed'}),
)(FeedComponent)
export default Feed
