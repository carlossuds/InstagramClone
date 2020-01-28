import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Feed from './pages/Feed';
import logo from './assets/instagram.png';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
    },
    {
      defaultNavigationOptions: {
        headerTitle: () => <Image source={logo} />,
        headerTitleAlign: 'center',
      },
    },
  ),
);

export default Routes;
