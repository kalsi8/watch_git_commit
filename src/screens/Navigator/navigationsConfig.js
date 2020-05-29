import Splash from '../Splash';
import GetDetails from '../GetDetails';
import ShowCommits from '../ShowCommits';
import React from 'react';
import LogoutButton from '../../components/LogoutButton';

const stackNavigationConfig = {
  initialRouteName: 'Splash',
  screens: [
    {
      name: 'Splash',
      screen: Splash,
      options: {headerShown: false},
    },
    {
      name: 'GetDetails',
      screen: GetDetails,
      options: {},
    },
    {
      name: 'Commits',
      screen: ShowCommits,
      options: {
        headerRight: () => <LogoutButton />,
      },
    },
  ],
};

export {stackNavigationConfig};
