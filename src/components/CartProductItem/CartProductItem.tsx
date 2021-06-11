import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector.tsx';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      oldPrice?: number;
      price: number;
    };
  };
}

export default function CartProductItem({cartItem}: CartProductItemProps) {
  const {quantity: quantityProp, item} = cartItem;

  const [quantity, setQuantity] = useState(quantityProp);

  const array = [...Array(5).keys()];

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: item.image}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.ratingContainer}>
            {array.map((el, idx) => (
              <FontAwesome
                key={`${item.id}-${idx}`}
                style={styles.star}
                name={idx < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}

            <Text>{item.ratings}</Text>
          </View>
          {item.oldPrice && (
            <Text style={styles.oldPrice}> ${item.oldPrice}</Text>
          )}
          <Text style={styles.price}>from ${item.price}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
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
