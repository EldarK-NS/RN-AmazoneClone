import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen/index';
import ProductScreen from '../screens/ProductScreen';
import {TextInput, View, SafeAreaView, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = ({
  searchValue,
  setSearchValue,
}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={styles.searchBar}>
      <View style={styles.container}>
        <AntDesign
          name="search1"
          color="black"
          size={18}
          style={{marginLeft: 10}}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Search ..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

export default function HomeStack() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
      }}>
      <Stack.Screen name="HomeScreen" options={{title: 'Home'}}>
        {() => <HomeScreen searchValue={searchValue}/>}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#48a3c6',
  },
  textInput: {
    height: 40,
    marginLeft: 10,
  },
  container: {
    margin: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
