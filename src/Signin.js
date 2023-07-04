import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable,Spinner } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from "../Config.json";
import { Context } from '../Store';

var { width } = Dimensions.get("window");

const Signin = () => {

    const [state, setState] = useContext(Context);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEnabled = email.length > 0 && password.length > 0;


  const login = async() => {

    setIsLoading(true);

   return  fetch(`${configData.SERVER_URL}/user/login`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email,
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
             AsyncStorage.setItem(
                "isLoggedIn", JSON.stringify("true")
              );
            setState({
                  ...state,
                    profImage: responseJson.data.profImage,
                    firstName: responseJson.data.firstName,
                    lastName: responseJson.data.lastName,
                    email: responseJson.data.email,
                    gender: responseJson.data.gender,
                    phone: responseJson.data.phoneNumber
                });
                setIsLoading(false);
                
                navigation.dispatch(
                        StackActions.replace('TabBottom', {})
                      );
             }
          if(responseJson.status === "incomplete"){
                  if(responseJson.data.regStatus === 1){
                    setIsLoading(false);
                         AsyncStorage.setItem(
                            "token", JSON.stringify(responseJson.token)
                          );
                  return navigation.navigate('Register');
                  }
                  if(responseJson.data.regStatus === 2){
                    setIsLoading(false);
                     AsyncStorage.setItem(
                        "token", JSON.stringify(responseJson.token)
                      );
                  return navigation.navigate('Register');
                  }
                  if(responseJson.data.regStatus === 3){
                    setIsLoading(false);
                     AsyncStorage.setItem(
                        "token", JSON.stringify(responseJson.token)
                      );
                  return navigation.navigate('Preference');
                  }
                  setIsLoading(false);
      
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
        <View style={[styles.containerone]}>


          <View style={[styles.top]}>
            <Image source={require('../assets/images/toykiddieIcon.png')} style={{ resizeMode: 'contain' }} />
          </View>


          <View style={{ paddingVertical: width / 10 }}>
            <Text style={[styles.welcomeText]}>Welcome Back!</Text>
            <Text style={[styles.subTitle]}>Sign in to your ToyKiddie account</Text>
          </View>

          <View style={[styles.middle]}>

            <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Email</Text>
            <Input w={{ base: "100%", md: "25%" }}
              _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
              style={{ height: width/8}}
              placeholder="Enter your email address"
              value={email} onChangeText={text => setEmail(text)} />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ alignSelf: 'flex-end', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Password</Text>
              <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Text style={{ alignSelf: 'flex-end', fontSize: width / 30, color: "#54448D", marginVertical: width / 40 }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Input w={{ base: "100%", md: "25%" }}
              type={show ? "text" : "password"}
              _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
              value={password} onChangeText={text => setPassword(text)}
              style={{ height: width/8}}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>} placeholder="Enter your password" />
          </View>

          <View style={[styles.bottom]}>

            <TouchableOpacity onPress={login} disabled={!isEnabled}>
              <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={(isEnabled) ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'flex-end', fontSize: width / 30, color: "#000", marginVertical: width / 40 }}>Don't have an account?</Text>
              <Text style={{ fontSize: width / 30, color: "#FD6562", marginVertical: width / 40, fontWeight: "bold" }}> Signup </Text>
            </TouchableOpacity>

          </View>










        </View>

        </>}

      </SafeAreaView>

    </>
  );
};



const styles = StyleSheet.create({
  body: {
    flex: 1,
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
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  middle: {
    width: "100%",
    height: 'auto',
    marginVertical: width / 20
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


export default Signin;