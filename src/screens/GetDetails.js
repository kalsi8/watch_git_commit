import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {doLogin} from '../service';
import {showToast, isIOS} from '../utils/utils';
import LogoutButton from '../components/LogoutButton';
import AsyncStorage from '@react-native-community/async-storage';

const headerConfig = {
  password: {title: 'Git Password'},
  username: {title: 'Git login'},
  repo: {title: 'Enter a Repo', headerRight: () => <LogoutButton />},
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f6',
  },
  input: {
    margin: 20,
    width: 300,
    borderBottomColor: '#00579a',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 20,
  },
  buttonWrapper: {
    backgroundColor: '#00579a',
    borderRadius: 20,
  },
});

function GetDetails({navigation, route = {}}) {
  const {params: {placeholder, key, username, Authorization} = {}} = route;
  const [value, setValue] = useState('');
  const processLogin = async () => {
    const {name, Authorization, status} = await doLogin({
      username,
      password: value,
    });
    if (Authorization) {
      await AsyncStorage.setItem('Authorization', Authorization);
      await AsyncStorage.setItem('name', name);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'GetDetails',
            params: {
              placeholder: 'Enter :owner/:repo name',
              key: 'repo',
              Authorization,
            },
          },
        ],
      });
    }
  };
  const processUsername = () => {
    navigation.push('GetDetails', {
      [key]: value,
      placeholder: 'Enter your github password',
      key: 'password',
    });
  };
  const processRepo = async () => {
    if (!value.includes('/')) {
      showToast('Repo name must be in :owner/repo formate');
      return;
    }
    const repoOwner = value.split('/');
    navigation.push('Commits', {
      repo: repoOwner[1],
      owner: repoOwner[0],
      Authorization,
    });
  };

  const functionMap = {
    password: processLogin,
    username: processUsername,
    repo: processRepo,
  };

  useEffect(() => {
    navigation.setOptions(headerConfig[key]);
  }, [key, navigation]);
  const onProceedPressed = () => {
    functionMap[key]();
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        autoCapitalize={'none'}
        secureTextEntry={key === 'password'}
        autoFocus
        placeholder={placeholder}
      />
      <View style={style.buttonWrapper}>
        <Button
          color={isIOS() ? '#ffffff' : '#00579a'}
          disabled={value.length < 3}
          onPress={onProceedPressed}
          title="Proceed"
        />
      </View>
    </View>
  );
}

export default GetDetails;
