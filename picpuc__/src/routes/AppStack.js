import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screen/home/Home';
import MapScreeen from '../screen/map/map';

const Tab = createMaterialBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapScreeen} />
      <Tab.Screen name="Map" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default AppStack;
