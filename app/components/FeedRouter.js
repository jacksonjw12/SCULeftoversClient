import React, {Component} from 'react';
import Feed from './Routes/Feed';



export default class FeedRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            view:"feed",
            postId:undefined,
        }

        this.navigateFeed = this.navigateFeed.bind(this)
    }

    navigateFeed(location){
        this.setState({view:location})
    }



    render(){


            return(

                <Feed
                    show={this.props.show && this.state.view === 'feed'}
                    navigateFeed={this.navigateFeed}
                    navigate={this.props.navigate}
                    client={this.props.client}
                    shouldFeedReload={this.props.shouldFeedReload}
                />

            )



    }


}
