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
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable, Spinner,Image } from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import configData from "../Config.json";

var { width } = Dimensions.get("window");

const Register = () => {

  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);

  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const isEnabled = email.length > 0 && password.length > 0 && phoneNumber.length > 0;


  const register = async() => {
        if (email === '') {
            toast.show({
              description: "Email is required"
            })
            return
        }
        if (phoneNumber === '') {
            toast.show({
              description: "Phone number is required"
            })
            return
        }
        if (password === '') {
          toast.show({
            description: "Password is required"
          })
            return
        }

        setIsLoading(true);
       

       return  fetch(`${configData.SERVER_URL}/user/register`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          password
        }) 
          })
        .then((response) => response.json())
        .then((responseJson) => {
              console.log(responseJson)
              if(responseJson.status === "success"){
                 AsyncStorage.setItem(
                    "token", JSON.stringify(responseJson.token)
                  );
                 setIsLoading(false);
                  navigation.navigate('Success', {
                    nav: "Register",
                    msg:"Your mobile phone number was verified successfully."
                  });
                // navigation.navigate('Success', {
                //   nav: "Pin",
                //   msg:"Your ToyKiddies account was created successfully."
                // });
              }
              if(responseJson.status === "error"){
                  toast.show({
                    description: responseJson.message
                   })
                   return setIsLoading(false);
              }
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
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


            <View style={{ paddingBottom: width / 10, paddingTop: width / 20 }}>
              <Text style={[styles.welcomeText]}>Create an Account</Text>
              <Text style={[styles.subTitle]}>Sign up for free to enable you gift, swap and request amazing toys on ToyKiddies.</Text>
            </View>

            <View style={[styles.middle]}>

              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>email</Text>
                <Input w={{ base: "100%", md: "25%" }}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={email} onChangeText={text => setEmail(text)}
                  placeholder="Enter your email" />
              </View>


              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Enter Phone Number</Text>

                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="NG"
                  layout="first"
                  // withShadow
                  // autoFocus
                  containerStyle={styles.phoneNumberView}
                  textContainerStyle={{ paddingVertical: 0 }}
                  onChangeFormattedText={text => {
                    setPhoneNumber(text);
                  }}
                />
              </View>



              <View style={styles.inputText}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ alignSelf: 'flex-end', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Password</Text>
                </View>
                <Input w={{ base: "100%", md: "25%" }}
                  type={show ? "text" : "password"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={password} onChangeText={text => setPassword(text)}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Create a password" />
              </View>

              <Text style={[styles.subTitle, { paddingTop: width / 20 }]}>By continuing, you agreed to ToyKiddies <Text style={{ color: "#6654A8", fontWeight: "800" }}>Terms of Service</Text> and <Text style={{ color: "#6654A8", fontWeight: "800" }}>Privacy Policy</Text>.</Text>

            </View>

            <View style={[styles.bottom]}>

              <Pressable disabled={!isEnabled} onPress={register}>
                <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={isEnabled ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                  <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Sign Up</Text>
                </LinearGradient>
              </Pressable>

              <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'flex-end', fontSize: width / 30, color: "#000", marginVertical: width / 40 }}>Already have an account?</Text>
                <Text style={{ fontSize: width / 30, color: "#FD6562", marginVertical: width / 40, fontWeight: "bold" }}> Sign In </Text>
              </TouchableOpacity>

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
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width / 10

  },
  image: {
    width: 200, height: 200, borderRadius: 250 / 2
  },
  top: {
    width: "100%",
    height: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  middle: {
    width: "100%",
    height: 'auto'
  },
  bottom: {
    width: "100%",
    marginTop: width / 5
  },
  welcomeText: {
    fontSize: width / 15,
    fontWeight: 'bold',
    color: "#061237"
  },
  subTitle: {
    color: "#6A7187",
    fontSize: width / 30,
  },
  disabledBtn: {
    marginVertical: width / 20,
    backgroundColor: '#DDDFE4',
    width: '100%',
    borderRadius: width / 40,
    padding: width / 35,
    elevation: 5,
  },
  phoneNumberView: {
    width: '100%',
    height: width/8,
    backgroundColor: '#fff',
    borderColor: "#C1C4CD",
    borderWidth: 0.6,
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


export default Register;