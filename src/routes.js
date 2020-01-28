import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import IconF from '@expo/vector-icons/Feather';

import Feed from './pages/Feed';
import logo from './assets/instagram.png';

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  },
});

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
    },
    {
      defaultNavigationOptions: {
        headerTitle: () => (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <IconF name="camera" size={25} />
            </TouchableOpacity>
            <Image source={logo} />
            <TouchableOpacity>
              <IconF name="inbox" size={25} />
            </TouchableOpacity>
          </View>
        ),
        headerTitleAlign: 'center',
      },
    },
  ),
);

export default Routes;
