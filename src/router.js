import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator, StackNavigator, TabNavigator,} from 'react-navigation';
import Home from './Home';
import Detail from './Detail';
import Benua from './Benua';


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  
  
  export default TabNavigator({
    Home: {
      screen: Home
    },
  
    Detail: {
      screen: Detail
    },
    Benua: {
      screen: Benua
    },
}, {
  
    drawerWidth: 300
  });