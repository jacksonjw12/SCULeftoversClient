import React, {Component} from 'react';

import {LoginScreen} from './pages/login';
import {FeedScreen} from './components/Routes/Feed';
import {NewPostScreen} from './components/Routes/Compose';
import {SettingsScreen} from './components/Routes/Settings';
import { ApolloProvider } from 'react-apollo';
import RootRouter from './components/RootRouter'
import {createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import createClient from './apollo/getClient'
//
// const TabNavigator = createBottomTabNavigator({
//   Feed: { screen: FeedScreen },
//   NewPost: { screen: NewPostScreen },
//   Settings: { screen: SettingsScreen}
// });

// const AppNavigator = createSwitchNavigator({
//   Login: LoginScreen,
//   Home: TabNavigator
// });
const client = createClient()
export default class App extends Component {

  render() {
      // return(
      //     <RootRouter />
      // )

	  return (
        <ApolloProvider client={client}>
            <RootRouter />
        </ApolloProvider>

	  );
}}
