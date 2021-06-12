import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector.tsx';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

export default function ProductScreen() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(0);

  const route = useRoute();
  const navigation = useNavigation();

  //!Get productId
  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  //! product options
  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  //!add product To Cart
  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    if (!product || !userData) {
      return;
    }
    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity: quantity,
      option: selectedOption,
      productID: product.id,
    });
    await DataStore.save(newCartProduct);
    navigation.navigate('shopingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

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
        <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
      )}
      <Text style={styles.price}>from ${product.price.toFixed(2)}</Text>

      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button text={'ADD TO CART'} onPress={onAddToCart} color={'#fc9803'} />
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
