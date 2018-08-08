/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Detail from './Detail';


const Main = createStackNavigator({
  Home: {
    screen: Home
  },
  Detail: {
    screen: Detail
  },
}, {
    headerMode: 'none'
  });

export default class App extends Component {
  render() {
    return (
      <Root>
        <Main />
      </Root >
    )
  }
}