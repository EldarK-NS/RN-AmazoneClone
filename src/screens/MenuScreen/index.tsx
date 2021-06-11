import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify'
import Button from './../../components/Button/index';

export default function MenuScreen() {
  const onLogout = () => {
   Auth.signOut()
  };

  return (
    <SafeAreaView>
       <Button text='SIgn out' onPress={onLogout} color='#e47911'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
