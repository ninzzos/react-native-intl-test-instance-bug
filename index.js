/**
 * @format
 */
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl-pluralrules';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
