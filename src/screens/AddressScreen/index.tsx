import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import {ItemValue} from '@react-native-picker/picker/typings/Picker';
import Button from '../../components/Button';

import {DataStore, Auth} from 'aws-amplify';
import {Order, OrderProduct, CartProduct} from '../../models';

import {useNavigation} from '@react-navigation/native';

const countries = countryList.getData();

export default function AddressScreen() {
  const [country, setCountry] = useState(countries[0].name);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation();

  const saveOrder = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // !create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,

        fullName: fullName,
        phoneNumder: phone,
        country: country,
        city: city,
        address: address,
      }),
    );
    //!fetch all cart items
    // the second parametr is a filter that gives us special fields
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );
    //!attach-(прикрепить) all cart items to the ,
    await Promise.all(
      cartItems.map(cartItem =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );
    // !delete all cart items
    await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));
    //!redirect
    navigation.navigate('home');
  };

  const onChekout = () => {
    if (!fullName) {
      Alert.alert('Please fill in the phone number field!!');
      return;
    }
    if (!phone) {
      Alert.alert('Please fill in the fullname field!!');
      return;
    }
    saveOrder();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={10}
    >
      <ScrollView style={styles.root}>
        <View style={styles.row}>
          <View style={styles.pickerBorder}>
            <Picker selectedValue={country} onValueChange={setCountry}>
              {countries.map(
                (country: {
                  name: string | undefined;
                  code: ItemValue | undefined;
                }) => (
                  <Picker.Item
                    label={`Country:  ${country.name}`}
                    value={country.code}
                    key={country.code}
                  />
                ),
              )}
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFullName}
            value={fullName}
            placeholder="First and Last name"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            placeholder="please enter your phone number"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Text style={{...styles.label, marginBottom: 4}}>Address</Text>
          <TextInput
            style={styles.inputAddress}
            onChangeText={setAddress}
            value={address}
            placeholder="Street address or PO box"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCity}
            value={city}
            placeholder="please enter your phone number"
          />
        </View>
        <View style={styles.row}>
          <View style={styles.lastForm}>
            <View style={styles.statePicker}>
              <Text style={{...styles.label, marginBottom: 5}}>State</Text>
              <View style={styles.pickerBorder}>
                <Picker selectedValue={country} onValueChange={setCountry}>
                  {countries.map(
                    (country: {
                      name: string | undefined;
                      code: ItemValue | undefined;
                    }) => (
                      <Picker.Item
                        label={country.code}
                        value={country.code}
                        key={country.code}
                        //
                      />
                    ),
                  )}
                </Picker>
              </View>
            </View>
            <View style={styles.statePicker}>
              <Text style={styles.label}>ZIP Code</Text>
              <TextInput
                style={styles.input}
                onChangeText={setZipCode}
                value={zipCode}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={styles.label}>Make this my default address</Text>
          </View>
        </View>
        <Button text={'CheckOut'} onPress={onChekout} color="#fc9803" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  inputAddress: {
    height: 40,
    //  marginVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  lastForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statePicker: {
    width: Dimensions.get('window').width * 0.3,
    //  alignItems:'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerBorder: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
  },
});
