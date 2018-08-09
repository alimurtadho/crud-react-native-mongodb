/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator, StackNavigator, TabNavigator, } from 'react-navigation';
import Home from './Home';
import Detail from './Detail';
import Benua from './Benua';
import DetailBenua from './DetailBenua';
import router from './router';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const MainMenu = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => {
        return (
          <View>
            <Text>negara</Text>
          </View>

        );
      }
    })
  },

  Benua: {
    screen: Benua,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => {
        return (
          <View>
            <Text>benua</Text>
          </View>

        );
      }
    })
  },
}, {

    tabBarOptions: {
      showLabel: false
    }
  });


// export default StackHome = StackNavigator({
//   Home: {
//       screen: Home,
//       navigationOptions: () => ({

//       })
//   },
//   Detail: {
//       screen: Detail,
//       navigationOptions: () => ({

//       })
//   },
//   Benua: {
//       screen: Benua,
//       navigationOptions: () => ({

//       })
//     }
//   },
//     {
//       headerMode: 'none',
//       initialRouteName: 'Home'

//   });



const Main = StackNavigator({
  Home: {
    screen: Home
  },
  Benua: {
    screen: Benua
  },
  Detail: {
    screen: Detail
  },
  DetailBenua: {
    screen: DetailBenua
  },
  MainMenu: {
    screen: MainMenu
  },
}, {
    headerMode: 'none',
    initialRouteName: 'MainMenu'
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