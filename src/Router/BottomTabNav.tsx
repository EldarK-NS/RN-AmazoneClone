import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import CartStack from './CartStack copy';
import MenuScreen from './../screens/MenuScreen/index';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#007eb9',
        inactiveTintColor: '#cccccc',
      }}>
      <Tab.Screen
        component={HomeStack}
        name="home"
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="profile"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        component={CartStack}
        name="shopingCart"
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="shopping-cart" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="more"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-menu" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
