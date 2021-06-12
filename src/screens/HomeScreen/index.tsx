import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem/ProductItem';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models';

export default function HomeScreen({searchValue}: {searchValue: string}) {
  const [products, setProducts] = useState<Product[]>([]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const results = await DataStore.query(Product);
  //       setProducts(results);
  //     };
  //     fetchProducts()
  //   }, []);

  //! up===down
  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
        //   initialNumToRender={3}
        //   initialScrollIndex={2}
        //   inverted={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 5,
  },
});
