import React, {Component} from 'react';
import {Text, View,ScrollView, RefreshControl, Image} from 'react-native';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";
import FeedItem from '../Common/FeedItem'
import NavBar from "../Common/NavBar";
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
            dimensions:undefined,
            refreshing:false,

        }
    }

    componentWillReceiveProps(props){
        console.log(props)
    }

    _onRefresh(){
        console.log("refresh")
        console.log(this.props.getFeed)
        this.props.getFeed.refetch().then(r=>{
            console.log(r.data)
            console.log(this.props.getFeed)
            //this.refs.sv.scrollTo({x: 0, y: 0, animated: true})

        })

    }
    onLayout = event => {
        if (this.state.dimensions) return
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
    }
    handleScroll = (event) => {
        this.scroll = event.nativeEvent.contentOffset.y
        if (this.ready && this.scroll < SCROLL_TRIGGER) {
        // load more stuff here
        }
    }
    handleSize = (width, height) => {
        if (this.scroll) {
            const position = this.scroll + height - this.height
            this.refs.sv.scrollTo({x: 0, y: position, animated: false})
        }
        this.height = height
    }
    render() {
        if(!this.props.show){
            return null
        }
        let reloaded = false
        if(this.props.shouldFeedReload()){
            this._onRefresh()
            reloaded = true
            this.scroll = 0

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
        if(this.props.getFeed.getFeed !== undefined){
            this.props.getFeed.getFeed.forEach((f,i)=>{
                feedItems.push((
                    <FeedItem key={i} show={this.props.show} dimensions={this.state.dimensions} item={f} />
                ))
            })
        }
        if(reloaded){
            //this.refs.sv.scrollTo({x: 0, y: 0, animated: true})

        }
        // if(feedItems.length < 2){
        //     feedItems.push((<View style={{height:this.state.dimensions.height}}/>))
        // }

        return (
            <View style={{flex:1,paddingBottom:0,marginBottom:0,backgroundColor:"transparent"}}>
                <ScrollView
                    ref="sv"
                    onScroll={this.handleScroll}
                    onContentSizeChange={this.handleSize}
                    scrollEventThrottle={16}
                    style={{backgroundColor:"#ededed"}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="Loading..."
                        />
                       }

                >
                    {/*<View style={{flex:1,justifyContent:'center'}}><Text>Feed!</Text></View>*/}
                    {/*<View key={0}>*/}
                        {/*<Text>{this.props.getFeed.getFeed[0].title}</Text>*/}
                        {/*<Image source={{uri: 'http://i.imgur.com/vKRaKDX.png',width:32,height:32}} onLoadStart={(e)=>console.log("loading")} />*/}
                    {/*</View>*/}
                    {feedItems}
                    <View style={{height:40}}/>
                </ScrollView>
                <NavBar view={'feed'} navigate={this.props.navigate} />

            </View>
        );

    }
}

const Feed = compose(
    graphql(GET_FEED, {name: 'getFeed'}),
)(FeedComponent)
export default Feed
