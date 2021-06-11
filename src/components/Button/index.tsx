import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  color:string;
}

export default function Button({text, onPress, color}: ButtonProps) {
  //   const onPress = () => {};
  return (
    <Pressable onPress={onPress} style={{...styles.root, backgroundColor:color}}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#a15e1b',
  },
  text: {
    fontSize: 18,
  },
});
