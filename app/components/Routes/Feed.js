import React, {Component} from 'react';
import {Text, View,ScrollView, Image} from 'react-native';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";
import FeedItem from '../Common/FeedItem'
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
            loading:[],
            dimensions:undefined

        }
    }
    onLayout = event => {
        if (this.state.dimensions) return
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
    }

    render() {
        if(!this.props.show){
            return null
        }
        if(this.props.getFeed.loading || this.state.dimensions === undefined){
            return(
                <View style={{flex: 1, alignSelf: 'stretch'}} onLayout={this.onLayout}>
                {this.state.dimensions? <Text>Loading</Text>: undefined}
                </View>
            )
        }
        let feedItems = []
        console.log(this.state.dimensions)
        this.props.getFeed.getFeed.forEach((f,i)=>{
            console.log(f)
            feedItems.push((
                <FeedItem key={i} show={this.props.show} dimensions={this.state.dimensions} item={f} />
            ))
        })
        return (
            <View style={{flex:1,paddingBottom:0,marginBottom:0,backgroundColor:"red"}}>
                <ScrollView style={{backgroundColor:"#ededed"}}>
                    {/*<View style={{flex:1,justifyContent:'center'}}><Text>Feed!</Text></View>*/}
                    {/*<View key={0}>*/}
                        {/*<Text>{this.props.getFeed.getFeed[0].title}</Text>*/}
                        {/*<Image source={{uri: 'http://i.imgur.com/vKRaKDX.png',width:32,height:32}} onLoadStart={(e)=>console.log("loading")} />*/}
                    {/*</View>*/}
                    {feedItems}
                    <View style={{height:40}}/>
                </ScrollView>
            </View>
        );

    }
}

const Feed = compose(
    graphql(GET_FEED, {name: 'getFeed'}),
)(FeedComponent)
export default Feed
