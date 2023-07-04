/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { NativeBaseProvider } from "native-base";

const Stack = createStackNavigator();
import Store from './Store';
import IntroScreen from './src/IntroScreen';
import Onboarding from './src/Onboarding';
import Signin from './src/Signin';
import Signup from './src/Signup';
import Success from './src/Success';
import Splash from './src/Splash'
import Pin from './src/Pin';
import Register from './src/signup/Register';
import Preference from './src/signup/Preference'
import TabBottom from './src/pages/Tab';
import ToyDetails from './src/pages/Tabs/Screens/ToyDetails';
import WishListDetails from './src/pages/Tabs/Screens/WishListDetails';
import ChatDetails from './src/pages/Tabs/Screens/ChatDetails';
import MainChat from './src/pages/Tabs/Screens/MainChat';
import GiftRequest from './src/pages/Tabs/Screens/GiftRequest';
import RequestMessage from './src/pages/Tabs/Screens/RequestMessage';

function App() {

  useEffect(() => {
    SplashScreen.hide();
}, []);
  
  return (

    <Store>
    <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
                  <Stack.Screen name="Splash" component={Splash} 
                      options={{headerShown: false}}/>
                  <Stack.Screen name="IntroScreen" component={IntroScreen} options={{headerShown: false}}/>
                  <Stack.Screen name="Onboarding" component={Onboarding} 
                      options={{headerShown: false}}/>
                  <Stack.Screen name="Signin" component={Signin} 
                      options={{headerShown: false}}/>
                  <Stack.Screen name="Signup" component={Signup} 
                      options={{headerShown: false}}/>
                  <Stack.Screen name="Success" component={Success} 
                          options={{headerShown: false}}/>
                  <Stack.Screen name="Pin" component={Pin} 
                          options={{headerShown: false}}/>
                  <Stack.Screen name="Register" component={Register} 
                          options={{headerShown: false}}/>
                  <Stack.Screen name="Preference" component={Preference} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="TabBottom" component={TabBottom} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="ToyDetails" component={ToyDetails} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="WishListDetails" component={WishListDetails} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="ChatDetails" component={ChatDetails} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="MainChat" component={MainChat} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="GiftRequest" component={GiftRequest} 
                  options={{headerShown: false}}/>
                  <Stack.Screen name="RequestMessage" component={RequestMessage} 
                  options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
    </Store>
    
  );
}


export default App;
