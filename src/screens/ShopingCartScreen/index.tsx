import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem/CartProductItem';
import {useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

export default function ShopingCartScreen() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();

  //! get data of all products in the order
  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  //! get data for  page, its for have accsess to images and quantity ech product

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }
    const fetchProducts = async () => {
      //query all products that are used in cart
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );
      // assign the products to the cart items
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
        })),
      );
    };
    fetchProducts();
  }, [cartProducts]);

  //

  useEffect(() => {
    const subscriptions = DataStore.observe(CartProduct).subscribe(
      msg => fetchCartProducts,
    );
    return subscriptions.unsubscribe();
  }, []);

  //! subscribe and unsubscribe to updating data quantity on the different gadgets in a real time
  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  //! redirect
  const onChekout = () => {
    navigation.navigate('Address');
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  //! calculate total ammount
  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );
  return (
    <View style={styles.page}>
      <View>
        <Text>
          Subtotal({cartProducts.length} items):{' '}
          <Text style={styles.totalPrice}> {totalPrice.toFixed(2)}$</Text>{' '}
          subtotal
        </Text>
        <Button
          text={'Procced to checkout'}
          color={'#fc9803'}
          onPress={onChekout}
        />
      </View>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        //! changed the place of header
        //   ListHeaderComponent={() => (
        //     <View>
        //       <Text>
        //         Subtotal({cartProducts.length} items):{' '}
        //         <Text style={styles.totalPrice}> {totalPrice.toFixed(2)}$</Text>{' '}
        //         subtotal
        //       </Text>
        //       <Button
        //         text={'Procced to checkout'}
        //         color={'#fc9803'}
        //         onPress={onChekout}
        //       />
        //     </View>
        //   )}
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
