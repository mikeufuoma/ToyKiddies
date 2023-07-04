/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Spinner } from 'native-base';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Context } from '../Store';
import configData from "../Config.json";

var {width} = Dimensions.get("window");
// let pic = require('../assets/images/logo.png');

const Splash =  () => {

    const [state, setState] = useContext(Context);
    const [userId, setUserId] = useState()

    const navigation = useNavigation();
 
    const load = async () => {
      const token = await AsyncStorage.getItem('token');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const loggedIn = JSON.parse(isLoggedIn);
      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
      // alert(userId)

      if(loggedIn === "true"){
        fetch(`${configData.SERVER_URL}/user/me`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(token) 
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)

            if(responseJson.status === "success"){
                setState({
                  ...state,
                  profImage: responseJson.data.profImage,
                  firstName: responseJson.data.firstName,
                  lastName: responseJson.data.lastName,
                  gender: responseJson.data.gender,
                  email: responseJson.data.email,
                  phone: responseJson.data.phoneNumber
                });
                     navigation.dispatch(
                       StackActions.replace('TabBottom', {})
                     ); 
            }
            if(responseJson.status === "error"){
                     navigation.dispatch(
                       StackActions.replace('Signin', {})
                     ); 
    

            }
            
          })
          .catch((error) => {
              navigation.dispatch(
              StackActions.replace('Signin', {})
              ); 
            console.error(error);
          });   
      }else{
        if(!hasSeenIntro){
          navigation.dispatch(
          StackActions.replace('Onboarding', {})
        );
        }else{
            navigation.dispatch(
            StackActions.replace('Signin', {})
          ); 
        } 
      }

           
    }
       
    useEffect(() => {
      setTimeout( () => {load()}, 2000);      
    })

     
   return (

      <SafeAreaView style={[styles.body]}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true}/>
            <View style={[styles.containerone]}>
                 <Spinner color='#6654A8' />
            </View>
      </SafeAreaView>

    );
  }

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor:"#fff",
  },
  containerone: {
    flex: 1,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignContent:'center'
    
  },
  image: {
    width: 250, height: 250, borderRadius: 250 / 2
  }
});

export default Splash;

