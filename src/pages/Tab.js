/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Dimensions,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from './Tabs/Home';
import Wishlist from './Tabs/Wishlist';
import Chats from './Tabs/Chats';
import Profile from "./Tabs/Profile";
import AddToy from "./Tabs/AddToy";

import Post from './components/Post';
import ProfImage from "./components/ProfImage";

var width = Dimensions.get("window").width;

const Tab = createBottomTabNavigator();

export default function TabBottom() {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-variant'
              : 'home-variant';
          } 
          if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart';
          }
          if (route.name === 'Chats') {
            iconName = focused ? 'message-bulleted' : 'message-bulleted';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={width / 16} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#423573',
        inactiveTintColor: '#83899B',
        showLabel: true,
        style: {
          backgroundColor: '#EEEDF1',
          paddingTop:width/40
        }
      }
      }>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Wishlist" component={Wishlist}/>
      <Tab.Screen
        name=" "
        component={AddToy}
        options={{
          tabBarIcon: () => {
            return <Post/>
          },
        }}
      />
      <Tab.Screen name="Chats" component={Chats}/>
      <Tab.Screen name="Profile" 
      component={Profile}
      
      options={{
        tabBarIcon: () => {
          return <ProfImage/>
        },
      }}/>
    </Tab.Navigator>
  );
}

