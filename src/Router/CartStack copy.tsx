import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShopingCartScreen from './../screens/ShopingCartScreen/index';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShopingCartScreen}
        name="cart"
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="Address"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
}
