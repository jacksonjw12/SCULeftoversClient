import React, {Component} from 'react';

import {LoginScreen} from './pages/login';
import {FeedScreen} from './pages/feed';
import {NewPostScreen} from './pages/newPost';
import {SettingsScreen} from './pages/settings';

import {createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
  Feed: { screen: FeedScreen },
  NewPost: { screen: NewPostScreen },
  Settings: { screen: SettingsScreen}
});

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Home: TabNavigator
});

export default class App extends Component {
  render() {
	  return (
      <AppNavigator />
	  );
}}
