import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const style = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  text: {
    color: '#ffffff',
  },
});

function LogoutButton() {
  const navigation = useNavigation();
  const onPress = () => {
    AsyncStorage.removeItem('Authorization');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'GetDetails',
          params: {
            placeholder: 'Enter your github login',
            key: 'username',
          },
        },
      ],
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.logoutButton} onTOuch>
        <Text style={style.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}

export default LogoutButton;
