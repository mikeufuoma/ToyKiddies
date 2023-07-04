
import React, { useState, useContext } from 'react';
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
import { useNavigation, StackActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Spinner, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from "../../Config.json";
import { Context } from '../../Store';

var { width, height } = Dimensions.get("window");

const initialInterest = [
    {id:1, name:"interactive", value:"interactive", color:"#80A1D4"},
    {id:2, name:"puzzle", value:"puzzle", color:"#6654A8"},
    {id:3, name:"puppet", value:"puppet", color:"#FD6562"},
    {id:4, name:"newBorns", value:"for new Borns", color:"#9747FF"},
    {id:5, name:"figures", value:"figures", color:"#12A58C"},
    {id:6, name:"Cars", value:"Cars", color:"#ECB43C"},
    {id:7, name:"creativity", value:"for creativity", color:"#4277FF"}
  ];

const Preference = () => {

    const navigation = useNavigation();

    const [state, setState] = useContext(Context);
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [interest, setInterest] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const addInterest = (item) => {

        if((interest).includes(item.name)){
            setInterest(oldValues => {
                return oldValues.filter(interest => interest !== item.name)
              })
             console.log("removed")
             return
            }
            setInterest(interest => [...interest, item.name]);
            console.log("added")
    }

    const isEnabled = gender.length > 0 && ageRange.length > 0 && interest.length > 0;

    const submit = async() => {
         
          const tokens = await AsyncStorage.getItem('token');

          setIsLoading(true);

          return  fetch(`${configData.SERVER_URL}/preference/add-preference`, {
            method: "post",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
              "x-auth-token": JSON.parse(tokens)
            },
            body: JSON.stringify({
              gender,
              ageRange,
              interest
            }) 
              })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              if(responseJson.status === "success"){

                    try {
                          setState({
                                ...state,
                                  profImage: responseJson.data.profImage,
                                  firstName: responseJson.data.firstName,
                                  lastName: responseJson.data.lastName,
                                  email: responseJson.data.email,
                                  gender: responseJson.data.gender,
                                  phone: responseJson.data.phoneNumber
                              });
                              navigation.dispatch( StackActions.replace('TabBottom', {}));
                              setIsLoading(false)
                        } catch (e) {
                          console.log(e)
                          setIsLoading(false)
                        }
                            
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

    const handleBackButtonClick = () => {
      navigation.goBack(null);
      return true;
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
                 <Image source={require('../../assets/images/toykiddieIcon.png')} style={{ resizeMode: 'contain'}} />
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

        <View style={[styles.section]}>

            <View style={{ paddingBottom: width / 10, paddingTop: width / 20 }}>
                <Text style={[styles.welcomeText]}>ToyKiddies Questions</Text>
                <Text style={[styles.subTitle]}>Your answers to the next few questions will help us find the right match to your need. </Text>
             </View>

             <View style={styles.subSection}>
                    <Text style={{ alignSelf: 'center', fontSize: width / 28, color: "#061237", fontWeight:"bold", marginVertical: width / 40 }}>How should your child be identified?</Text>
                    <View style={styles.gender}>
                        <TouchableOpacity onPress={()=> setGender('male')} style={(gender == 'male') ? [styles.genderBox, {backgroundColor:"#FD6562"}]  : styles.genderBox}>
                            <Text style={(gender == 'male') ? [styles.genderBoxText, {color:"#fff"}]  : styles.genderBoxText}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setGender('female')} style={(gender == 'female') ? [styles.genderBox, {backgroundColor:"#FD6562"}]  : styles.genderBox}>
                            <Text style={(gender == 'female') ? [styles.genderBoxText, {color:"#fff"}]  : styles.genderBoxText}>Female</Text>
                        </TouchableOpacity>
                    </View>

                </View>

             <View style={[styles.subSection,{marginTop:width/20}]}>
                    <Text style={{ alignSelf: 'center', fontSize: width / 28, color: "#061237", fontWeight:"bold", marginVertical: width / 40 }}>How old is your child?</Text>
                    <View style={styles.gender}>
                        <TouchableOpacity onPress={()=> setAgeRange('0-2')} 
                        style={(ageRange == '0-2') ? [styles.ageBox, {backgroundColor:"#9747FF"}] : styles.ageBox}>
                            <Text style={(ageRange == '0-2') ? [styles.genderBoxText, {color:"#fff"}] : styles.genderBoxText}>0-2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setAgeRange('3-6')} 
                        style={(ageRange == '3-6') ? [styles.ageBox, {backgroundColor:"#9747FF"}] : styles.ageBox}>
                            <Text style={(ageRange == '3-6') ? [styles.genderBoxText, {color:"#fff"}] : styles.genderBoxText}>3-6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setAgeRange('7-9')} 
                        style={(ageRange == '7-9') ? [styles.ageBox, {backgroundColor:"#9747FF"}] : styles.ageBox}>
                            <Text style={(ageRange == '7-9') ? [styles.genderBoxText, {color:"#fff"}] : styles.genderBoxText}>7-9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setAgeRange('10+')} 
                        style={(ageRange == '10+') ? [styles.ageBox, {backgroundColor:"#9747FF"}] : styles.ageBox}>
                            <Text style={(ageRange == '10+') ? [styles.genderBoxText, {color:"#fff"}] : styles.genderBoxText}>10+</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            

                <View style={[styles.subSection,{marginTop:width/20}]}>
                    <Text style={{ alignSelf: 'center', fontSize: width / 28, color: "#061237", fontWeight:"bold", marginVertical: width / 40 }}>Select what you are interested in</Text>
                    <View style={[styles.gender, {flexWrap:"wrap"}]}>


                     {initialInterest.map((i, index) => {
                        return <>
                        <TouchableOpacity key={index + 1} onPress={()=> addInterest(i)} style={((interest).includes(i.name)) ? [styles.ageBox, {backgroundColor:i.color} ]: styles.ageBox}>
                            <Text  style={((interest).includes(i.name)) ? [styles.genderBoxText, {color:"#fff"} ]: styles.genderBoxText}>{i.value}</Text>
                            {((interest).includes(i.name)) ?
                            <Ionicons name={'close-circle-sharp'} size={width / 25} style={{ color: "#fff" }}/> : null}
                        </TouchableOpacity>

                                </> })}
                    </View>

                </View>

                <Pressable style={{marginTop:width/10}} disabled={!isEnabled} onPress={submit}>
                <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={isEnabled ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                    <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Submit</Text>
                </LinearGradient>
                </Pressable>


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
  section: {
    width: "100%",
    flex: 1,
  },
  subSection:{
    width: "100%",
    justifyContent: 'center'
  },
  gender:{
     flexDirection:"row",
     justifyContent: 'space-around',
     borderTopWidth: 1,
     borderColor:"#E8EAED",
     paddingTop:width/40,
    },
  genderBox:{
        borderRadius:width/20,
        backgroundColor:"#E8EAED",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:width/50,
        paddingHorizontal:width/20,
        marginTop:width/40
    },
    genderBoxText:{
        fontSize:width/30,
        color:"#C1C4CD",
        marginRight:width/90
    },
    ageBox:{
        flexDirection:"row",
        borderRadius:width/20,
        backgroundColor:"#E8EAED",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:width/50,
        paddingHorizontal:width/20,
        marginTop:width/40
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

export default Preference;