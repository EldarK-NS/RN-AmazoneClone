import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function QuantitySelector({quantity, setQuantity}) {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    width: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d1d1',
  },
  buttonText: {
    fontSize: 24,
  },
  quantity: {
    color: '#007eb9',
    fontSize: 24,
  },
});
