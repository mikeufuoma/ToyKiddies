import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable, FormControl, TextArea } from 'native-base';
var { width } = Dimensions.get("window");
import configData from "../../../../Config.json";

const GiftRequest = ({route}) => {

    const { data } = route.params;


  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }


  const navigation = useNavigation();
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEnabled = fullName.length > 0 && message.length > 0;


  const submit = async() => {

    // return console.log(JSON.stringify(data, null, 2))

    const token = await AsyncStorage.getItem('token');
    setIsLoading(true);

    return  fetch(`${configData.SERVER_URL}/transaction/get-toy/${data._id}`, {
     method: "post",
     headers: {
       Accept: "application/json",
       "content-type": "application/json",
       "x-auth-token": JSON.parse(token)
     },
     body: JSON.stringify({
       transactionMethod:data.requestType,
       message:message
     }) 
       })
     .then((response) => response.json())
     .then((responseJson) => {
           console.log(responseJson)
           if(responseJson.status === "success"){
               setIsLoading(false);
               navigation.navigate('Success', {
                   nav: "TabBottom",
                   msg:"You have  submitted your request to a user on ToyKiddies. You will be  able to chat with the user if he accepts your request."
               });
           }
           if(responseJson.status === "error"){
               setIsLoading(false);
               return  toast.show({
                 description: responseJson.message
               })
                
           }
     })
     .catch((error) => {
         console.error(error);
         setIsLoading(false);
     })

    // if (data.requestType === "gift"){
    //     const token = await AsyncStorage.getItem('token');
    //     setIsLoading(true);
   
    //     return  fetch(`${configData.SERVER_URL}/transaction/get-toy/${data._id}`, {
    //      method: "post",
    //      headers: {
    //        Accept: "application/json",
    //        "content-type": "application/json",
    //        "x-auth-token": JSON.parse(token)
    //      },
    //      body: JSON.stringify({
    //        transactionMethod:data.requestType,
    //        message:message
    //      }) 
    //        })
    //      .then((response) => response.json())
    //      .then((responseJson) => {
    //            console.log(responseJson)
    //            if(responseJson.status === "success"){
    //                setIsLoading(false);
    //                navigation.navigate('Success', {
    //                    nav: "TabBottom",
    //                    msg:"You have  submitted your request to a user on ToyKiddies. You will be  able to chat with the user if he accepts your request."
    //                });
    //            }
    //            if(responseJson.status === "error"){
    //                setIsLoading(false);
    //                return  toast.show({
    //                  description: responseJson.message
    //                })
                    
    //            }
    //      })
    //      .catch((error) => {
    //          console.error(error);
    //          setIsLoading(false);
    //      })

    // }else{
    //     const token = await AsyncStorage.getItem('token');
    //     setIsLoading(true);
   
    //     return  fetch(`${configData.SERVER_URL}/transaction/get-toy/${data._id}`, {
    //      method: "post",
    //      headers: {
    //        Accept: "application/json",
    //        "content-type": "application/json",
    //        "x-auth-token": JSON.parse(token)
    //      },
    //      body: JSON.stringify({
    //        transactionMethod:data.requestType,
    //        message:message
    //      }) 
    //        })
    //      .then((response) => response.json())
    //      .then((responseJson) => {
    //            console.log(responseJson)
    //            if(responseJson.status === "success"){
    //                setIsLoading(false);
    //                navigation.navigate('Success', {
    //                    nav: "TabBottom",
    //                    msg:"You have  submitted your request to a user on ToyKiddies. You will be  able to chat with the user if he accepts your request."
    //                });
    //            }
    //            if(responseJson.status === "error"){
    //                setIsLoading(false);
    //                return  toast.show({
    //                  description: responseJson.message
    //                })
                    
    //            }
    //      })
    //      .catch((error) => {
    //          console.error(error);
    //          setIsLoading(false);
    //      })

    // }
  





   }




  return (
    <>
      <SafeAreaView style={[styles.body]}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />


        <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={[styles.body]} enableOnAndroid>

          <View style={[styles.containerone]}>

            <View style={[styles.top]}>
                <TouchableOpacity  onPress={()=> handleBackButtonClick()}>
                  <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#061237" }} />
                </TouchableOpacity>
                <Text style={{ color:"#061237", fontSize:width/20, fontWeight:"bold" }}>{data.requestType === "gift" ? "Gift" : "Swap"} Request</Text>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>


            <View style={[styles.middle]}>
                

                <Text style={{fontSize:width/30, color:"#6A7187", textAlign:"center", marginVertical:width/20, marginHorizontal:width/20 }}>{data.requestType === "gift" ? "Send a gift request to toy owners. If your request appeals to them, they'll accept and let you start a chat." : "Send a swap request to toy owners. If your request appeals to them, they'll accept and let you start a chat."}</Text>
            

              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Full Name</Text>
                <Input w={{ base: "100%", md: "25%" }} type={"text"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={fullName} onChangeText={text => setFullName(text)}
                  InputRightElement={
                    <Pressable onPress={() => setFullName("")}>
                      <Icon as={<Ionicons name={(fullName.length > 0 ) ? "close-circle-outline" : null} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Enter your first name" />
               </View>



              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Request Type</Text>
                <View style={{borderColor:"#C1C4CD", borderWidth:1, borderRadius:width/80, paddingLeft:width/20, paddingTop:width/40, paddingBottom:width/40}}>
                    <View style={{width:width/5, backgroundColor:"#C1C4CD", borderRadius:width/20, paddingLeft:width/20, paddingRight:width/20, paddingTop:width/40, paddingBottom:width/40}}>
                        <Text style={{color:"#000"}}>{data.requestType === "gift" ? "Gift" : "Swap"}</Text>
                    </View>
                </View>
              </View>

              <View style={styles.inputText}>
                   <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Request Message</Text>

                   <TextArea h={40} placeholder="Type your message here" w="100%" maxW="100%" 
                   _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                   value={message} onChangeText={text => setMessage(text)}/>

                   <Text style={{ alignSelf: 'flex-end', fontSize: width / 40, color: "#6A7187", marginVertical: width / 40 }}>145-150</Text>
              </View>


            </View>

            <View style={[styles.bottom]}>

              <Pressable disabled={!isEnabled} onPress={submit}>
                <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={isEnabled ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                  <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Submit</Text>
                </LinearGradient>
              </Pressable>

            </View>

          </View>

        </KeyboardAwareScrollView>

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
    height:hp('5%'),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
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

export default GiftRequest;