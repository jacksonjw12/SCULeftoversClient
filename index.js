/** @format */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import { ApolloClient } from 'apollo-client';

//const client = new ApolloClient();
AppRegistry.registerComponent(appName, () => App);
//export {client}
