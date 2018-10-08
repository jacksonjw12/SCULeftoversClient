import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USER_INFO = gql`
{
  User{
    id
    email
  }
 
}
`;
class TestApolloComponent extends React.Component {
    constructor(props){
        super(props)
        console.log("in test apollo")
    }
    render() {
        if(this.props.getUserInfo.loading){
            return(
                <Text>Loading User Info</Text>
            )
        }
        else{
            return (
                <View style={{ flex: 1,height:50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Welcome User: {this.props.getUserInfo.User.email}!</Text>
                    <Text>Your User ID is:</Text>
                    <Text>{this.props.getUserInfo.User.id}</Text>
                </View>
              );
        }

    }
  }

const TestApollo = compose(
  graphql(GET_USER_INFO, { name: 'getUserInfo' }),
)(TestApolloComponent)
export default TestApollo
