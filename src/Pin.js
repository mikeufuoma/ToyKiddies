
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable,Image } from 'native-base';
import configData from "../Config.json";

var { width, height } = Dimensions.get("window");

const Pin = () => {

  const [show, setShow] = useState(false);


  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }


  const navigation = useNavigation();
  const toast = useToast();
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEnabled = pin.length > 0;

  const submit = async() => {
    // if(isNaN(pin)){ 
    //   return  toast.show({
    //     description: "Pin should be a number"
    //   })
    // }


     const token = await AsyncStorage.getItem('token');

    return  fetch(`${configData.SERVER_URL}/user/pin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-auth-token": JSON.parse(token)
      },
      body: JSON.stringify({
        pin:pin
      }) 
        })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.status === "success"){
            navigation.navigate('Success', {
              nav: "Register",
              msg:"Your mobile phone number was verified successfully."
            });
         }
         if(responseJson.status === "error"){
              return  toast.show({
                description: responseJson.message
              })
           }
      })
      .catch((error) => {
          console.error(error);
      })


   }


  return (
    <>
      <SafeAreaView style={[styles.body]}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />


        
      {isLoading ? <>
          
        <View style={{
             flex: 1, width: '100%',
             backgroundColor: '#fff',opacity: 0.7,
            justifyContent:'center',
            alignItems:'center' }}>
                 <Image source={require('../assets/images/toykiddieIcon.png')} style={{ resizeMode: 'contain'}} />
                 <Spinner color='#6654A8' style={{fontSize:width/2, marginTop:width/20 }}  />
            </View>
      
         </>
          
          :
        <>  

        <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={[styles.body]} enableOnAndroid>

          <View style={[styles.containerone]}>

            <View style={[styles.top]}>
              <TouchableOpacity onPress={handleBackButtonClick} style={{ paddingTop: width / 20 }}>
                <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#061237" }} />
              </TouchableOpacity>
            </View>

        <View style={[styles.bottom]}>

              <View style={{ paddingTop: width / 20 }}>
                    <Text style={[styles.welcomeText]}>Enter 6 Digit Code</Text>
                    <Text style={[styles.subTitle]}>Please enter the code we’ve sent to</Text>
                    <Text style={{fontWeight: "bold", marginBottom:width/40}}>08090897629.</Text>

                    <View style={styles.inputText}>

                      <Input w={{ base: "100%", md: "25%" }}
                          type={show ? "text" : "password"}
                          _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                          style={{ height: width/8}}
                          value={pin} onChangeText={text => setPin(text)}
                          InputRightElement={
                              <Pressable onPress={() => setShow(!show)}>
                              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                              </Pressable>} placeholder="Enter 6 digit PIN code" />
                      </View>
                  </View>

              <View>
                  <View style={{flexDirection:"row", alignItems: "center", textAlign: "center"}}>
                      <Ionicons name={'ios-lock-closed'} size={width / 18} style={{ color: "#061237", width: "10%" }} />
                      <Text style={[styles.subTitle, { width: "90%" }]}>We need to check each person using ToyKiddies to make sure that exchanging toys is done safely.</Text>
                    </View>

                    <Pressable disabled={!isEnabled} onPress={submit}>
                      <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={isEnabled ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                        <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Verify</Text>
                      </LinearGradient>
                    </Pressable>
                </View>

            </View>

          </View>

        </KeyboardAwareScrollView>


        </>}

      </SafeAreaView>

    </>
  );
};



const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerone: {
    height: height,
    backgroundColor: "#fff",
    paddingHorizontal: width / 10

  },
  top: {
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottom: {
    width: "100%",
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom:width/5
  },
  welcomeText: {
    fontSize: width / 15,
    fontWeight: 'bold',
    color: "#061237",
    marginBottom:width/50
  },
  subTitle: {
    color: "#6A7187",
    fontSize: width / 32
  },
  disabledBtn: {
    marginVertical: width / 20,
    backgroundColor: '#DDDFE4',
    width: '100%',
    borderRadius: width / 40,
    padding: width / 35,
    elevation: 5,
  },
  loginBtn: {
    marginVertical: width / 20,
    width: '100%',
    borderRadius: width / 40,
    padding: width / 35,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width / 25,
    fontWeight: "500",
    marginTop: width / 80
  },
  btnTextOne: {
    color: "#6654A8",
    textAlign: "center",
    fontSize: width / 25,
    fontWeight: "500",
    marginTop: width / 80
  },

});


export default Pin;