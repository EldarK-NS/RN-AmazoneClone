import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem/ProductItem';
import products from '../../data/products';

export default function HomeScreen({searchValue}:{searchValue: string}) {
   console.log(searchValue)
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
