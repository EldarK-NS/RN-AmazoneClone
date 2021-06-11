import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector.tsx';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {useRoute} from '@react-navigation/native';

export default function ProductScreen() {
  const route = useRoute();
  console.log(route.params);

  const [selectedOption, setSelectedOption] = useState(
    product.options ? product.options[0] : null,
  );

  const [quantity, setQuantity] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <ImageCarousel images={product.images} />
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => setSelectedOption(itemValue)}>
          {product.options.map((p, idx) => (
            <Picker.Item
              label={`Color: ${p.toUpperCase()}`}
              value={p}
              key={idx}
            />
          ))}
        </Picker>
      </View>
      {product.oldPrice && (
        <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
      )}
      <Text style={styles.price}>from ${product.price}</Text>

      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        text={'ADD TO CART'}
        onPress={() => {
          console.warn('add');
        }}
        color={'#fc9803'}
      />
      <Button
        text={'BUY NOW'}
        onPress={() => {
          console.warn('buy');
        }}
        color={'#e47911'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
  description: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  picker: {
    marginVertical: 15,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: '#ededed',
  },
});
