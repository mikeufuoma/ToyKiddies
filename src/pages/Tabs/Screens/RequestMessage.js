import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
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
import { useToast, Spinner, 
    Image } from 'native-base';
var { width } = Dimensions.get("window");
import configData from "../../../../Config.json";

const RequestMessage = ({route}) => {

    const { data } = route.params;


  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const accept = async() => {

    // return console.log(JSON.stringify(data, null, 2))

    const token = await AsyncStorage.getItem('token');
    setIsLoading(true);

    return  fetch(`${configData.SERVER_URL}/transaction/accept-gift-request/${data._id}`, {
     method: "post",
     headers: {
       Accept: "application/json",
       "content-type": "application/json",
       "x-auth-token": JSON.parse(token)
       },
    })
     .then((response) => response.json())
     .then((responseJson) => {
           console.log(responseJson)
           if(responseJson.status === "success"){
               setIsLoading(false);
               navigation.navigate('Success', {
                   nav: "TabBottom",
                   msg:"You have  accepted the request of a user on ToyKiddies, thisallows the user to chat with you live"
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
          setIsLoading(false);
         console.error(error);
     })

   }

   const decline = async() => {

    const token = await AsyncStorage.getItem('token');
    setIsLoading(true);

    return  fetch(`${configData.SERVER_URL}/transaction/decline-request/${data._id}`, {
     method: "post",
     headers: {
       Accept: "application/json",
       "content-type": "application/json",
       "x-auth-token": JSON.parse(token)
       },
    })
     .then((response) => response.json())
     .then((responseJson) => {
           console.log(responseJson)
           if(responseJson.status === "success"){
            setIsLoading(false);
               navigation.navigate('Success', {
                   nav: "TabBottom",
                   msg:"You have  rejected the request of a user on ToyKiddies, this allows the user to chat with you live"
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
      setIsLoading(false);
         console.error(error);
     })


   }




  return (
    <>
      <SafeAreaView style={[styles.body]}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />


      {isLoading ? <>
          
        <View style={{
             flex: 1,
             backgroundColor: '#fff',opacity: 0.7,
            justifyContent:'center',
            alignContent:'center' }}>
                 <Spinner color='#6654A8' />
            </View>
      
      </>
          
          :
        <>
        <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={[styles.body]} enableOnAndroid>

          <View style={[styles.containerone]}>

            <View style={[styles.top]}>
                <TouchableOpacity  onPress={()=> handleBackButtonClick()}>
                  <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#061237" }} />
                </TouchableOpacity>
                <Text style={{ color:"#061237", fontSize:width/20, fontWeight:"bold" }}> Request Message</Text>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>


            <View style={[styles.middle]}>

                <View style={{flexDirection:"row", backgroundColor:"#F7F9FC", paddingVertical:width/20, paddingHorizontal:width/20, borderRadius:width/40, marginTop:width/20}}>

                    <Image size={width / 8} borderRadius={100} 
                        source={{uri:`${configData.PIC_URL}/${data.initiatedUserId.profImage}`}}alt="image" style={{}}/>

                        <View style={{marginLeft:width/30}}>
                            <Text style={styles.firstName}>{data.initiatedUserId.firstName + " " + data.initiatedUserId.lastName}</Text>
                            <Text style={styles.location}>Sydney, Australia</Text>
                        </View>
                        
                  </View>


                <View style={{flexDirection:"row", backgroundColor:"#F7F9FC", paddingVertical:width/20, paddingHorizontal:width/20, borderRadius:width/40, marginTop:width/20}}>
                            <Text style={styles.msg}>Sydney, Australia</Text>
                </View>

            </View>

    {data.status === "pending" &&
          <View style={[styles.bottom]}>

            <TouchableOpacity onPress={accept}>
                <LinearGradient style={styles.loginBtn} colors={['#6654A8', '#423573']}>
                    <Text style={styles.btnText}>Accept</Text>
                </LinearGradient>
            </TouchableOpacity>


            <TouchableOpacity onPress={decline}>
                <LinearGradient style={styles.loginBtnOutline} colors={['#fff', '#fff']}>
                    <Text style={styles.btnTextOne}>Decline</Text>
                </LinearGradient>
            </TouchableOpacity>


                </View>

            }
        </View>

        </KeyboardAwareScrollView>

        </>  }

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
  firstName:{
      color:"#000", fontSize:width/25, fontWeight:"bold"
  },
  location:{
      color:"#6A7187", fontSize:width/35, marginTop:width/80
  },
  msg:{
    color:"#6A7187", fontSize:width/30
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
  loginBtnOutline:{
    marginVertical: width / 20,
    width: '100%',
    borderRadius: width / 40,
    padding: width / 35,
    borderWidth:1.5,
    borderColor: '#6654A8'
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

export default RequestMessage;