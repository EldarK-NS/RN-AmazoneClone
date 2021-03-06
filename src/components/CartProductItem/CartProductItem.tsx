import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector.tsx';
import {DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';

interface CartProductItemProps {
  cartItem: CartProduct;
}

export default function CartProductItem({cartItem}: CartProductItemProps) {
  const {product, ...cartProduct} = cartItem;
  //   const [quantity, setQuantity] = useState(quantityProp);

  const updateQuantity = async (newQuantity: number) => {
    const original = await DataStore.query(CartProduct, cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, updated => {
        updated.quantity = newQuantity;
      }),
    );
  };
  const array = [...Array(5).keys()];

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: product.image}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {product.title}
          </Text>
          <View style={styles.ratingContainer}>
            {array.map((el, idx) => (
              <FontAwesome
                key={`${product.id}-${idx}`}
                style={styles.star}
                name={idx < Math.floor(product.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}

            <Text>{product.ratings}</Text>
          </View>
          {product.oldPrice && (
            <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
          )}
          <Text style={styles.price}>from ${product.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={cartProduct.quantity}
          setQuantity={updateQuantity}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  root: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
  },
  rightContainer: {
    padding: 5,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    flex: 2,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    margin: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    marginVertical: 5,
    marginLeft: 5,
  },
});
