import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Splash({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('Authorization', false).then(Authorization => {
      if (Authorization) {
        navigation.replace('GetDetails', {
          placeholder: 'Enter :owner/:repo name',
          key: 'repo',
          Authorization,
        });
      } else {
        navigation.replace('GetDetails', {
          placeholder: 'Enter your github login',
          key: 'username',
        });
      }
    });
  }, [navigation]);

  return (
    <View>
      <Text>This App is To watch Commits on Git</Text>
    </View>
  );
}

export default Splash;
