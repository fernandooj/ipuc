import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screen/home/Home';
import MapScreeen from '../screen/map/map';
import LoginScreen from '../screen/login/login';
import NewEventScreen from '../screen/newEvent/newEvent';
import Icon from 'react-native-vector-icons/Feather';
const Tab = createMaterialBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="aperture" size={25} color="red" />
          ),
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreeen} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="aperture" size={25} color="red" />
          ),
        }}
      />
      <Tab.Screen 
        name="NewEvent" 
        component={NewEventScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="aperture" size={25} color="red" />
          ),
        }}
      />
      <Tab.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="aperture" size={25} color="red" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
