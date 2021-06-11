import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem/CartProductItem';
import cart from '../../data/cart';
import {useNavigation} from '@react-navigation/native';

export default function ShopingCartScreen() {
  const navigation = useNavigation();
  const totalPrice = cart.reduce(
    (summedPrice, product) =>
      summedPrice + product.item.price * product.quantity,
    0,
  );

  const onChekout = () => {
    navigation.navigate('Address');
  };
  return (
    <View style={styles.page}>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text>
              Subtotal(3 items):
              <Text style={styles.totalPrice}>
                {' '}
                {totalPrice.toFixed(2)}$
              </Text>{' '}
            </Text>
            <Button
              text={'Procced to checkout'}
              color={'#fc9803'}
              onPress={onChekout}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 5,
  },
  totalPrice: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
