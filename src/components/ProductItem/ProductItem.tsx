import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating: number;
    ratings: number;
    oldPrice?: number;
    price: number;
  };
}

export default function ProductItem({item}: ProductItemProps) {
   
  const array = [...Array(5).keys()];

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ProductDetails', {id: item.id});
  };

  return (
    <Pressable style={styles.root} onPress={onPress}>
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
          <Text style={styles.oldPrice}> ${item.oldPrice.toFixed(2)}</Text>
        )}
        <Text style={styles.price}>from ${item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    flex: 2,
    resizeMode: 'contain',
    marginLeft: 5,
    //  borderRadius: 5,
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
});
