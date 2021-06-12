/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/Router/index';

import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './src/aws-exports'
Amplify.configure({
   ...config,
   Analytics: {
     disabled: true,
   },
 });
// Amplify.configure(config)

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Router />
    </SafeAreaView>
  );
};

export default withAuthenticator(App);
