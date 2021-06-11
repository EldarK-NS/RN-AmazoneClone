import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';

export default function ImageCarousel({images}: {images: string[]}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const windowWidth = useWindowDimensions().width;

  const onFlatListUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatListUpdate}
      />
      <View style={styles.dotContainer}>
        {images.map((image, idx) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: idx === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ededed',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    margin: 4,
  },
});
