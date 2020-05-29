import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stackNavigationConfig} from './navigationsConfig';
import {StatusBar, StyleSheet} from 'react-native';

const {Screen: StackScreen, Navigator: StackNavigator} = createStackNavigator();
const screenOptions = {
  headerStyle: {
    backgroundColor: '#1976d2',
  },
  headerTintColor: '#ffffff',
};
function Navigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#004c9f" />
      <StackNavigator
        initialRouteName={stackNavigationConfig.initialRouteName}
        screenOptions={screenOptions}>
        {stackNavigationConfig.screens.map(({name, screen, options = {}}) => (
          <StackScreen
            key={name}
            name={name}
            component={screen}
            options={options}
          />
        ))}
      </StackNavigator>
    </NavigationContainer>
  );
}

export default Navigator;
