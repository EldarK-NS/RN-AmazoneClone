import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';

const Root = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown:false}}>
         <Root.Screen component={BottomTabNav} name='HomeTabs'/>
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
