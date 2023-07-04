import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable, FormControl, Select } from 'native-base';
import { Context } from '../../../../Store';
import configData from "../../../../Config.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

var { width } = Dimensions.get("window");

const EditProfile = () => {

    const navigation = useNavigation();
    const [state, setState] = useContext(Context);
    const toast = useToast();
    const [firstname, setFirstname] = useState(state.firstName);
    const [lastname, setLastname] = useState(state.lastName);
    const [gender, setGender] = useState(state.gender);
    const [email, setEmail] = useState(state.email);

    const isEnabled = firstname && lastname && gender;


    const submit = async() => {
      const token = await AsyncStorage.getItem('token');
 
      const data = new FormData();
 
      // data.append('profImage', {
      //   name: profImage.fileName,
      //   type: profImage.type,
      //   uri: Platform.OS === 'ios' ? profImage.uri.replace('file://', '') : profImage.uri,
      // });
      data.append('firstname', firstname);
      data.append('lastname', lastname);
      data.append('gender', gender);
 
 
 


    return  fetch(`${configData.SERVER_URL}/user/update`, {
      method: "put",
      headers: {
        // Accept: "application/json",
        "content-type": "multipart/form-data",
        "x-auth-token": JSON.parse(token)
      },
      body: data 
        })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.status === "success"){

          setState({
            ...state,
              firstName: responseJson.data.firstName,
              lastName: responseJson.data.lastName,
              gender: responseJson.data.gender,
          });

            return  toast.show({
              description: responseJson.message
            })
          
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

      // navigation.navigate('Success', {
      //     nav: "TabBottom",
      //     msg:"You have updated your profile on ToyKiddies successful"
      //   });
  }


    return (
        <>

   <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={{height: "auto"}}  contentContainerStyle={{ paddingBottom: width/4 }} enableOnAndroid>

        <View style={styles.main}>

            <View style={[styles.middle]}>

              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>First Name</Text>
                <Input w={{ base: "100%", md: "25%" }} type={"text"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={firstname} onChangeText={text => setFirstname(text)}
                   placeholder="Enter your first name" />
               </View>

              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Last Name</Text>
                <Input w={{ base: "100%", md: "25%" }} type={"text"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={lastname} onChangeText={text => setLastname(text)}
                   placeholder="Enter your first name" />
              </View>

        
            <View style={styles.inputText}>
                <FormControl>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Gender</Text>

                <Select 
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="What’s your gender"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={gender}
                    style={{ height: width/8, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                        <Select.Item label="Male " value="male" />
                        <Select.Item label="Female" value="female" />
                {/* {city.map((c, index) => (
                    <Select.Item key={index + 1} label={c.name} value={c._id} />
                    ))} */}
                </Select>

                </FormControl>
                </View>

{/* 
            <View style={styles.inputText}>
                <FormControl>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>State you live in</Text>
                <Select 
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Click Here"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={state}
                    style={{ height: width/8, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => setState(itemValue)}>

                        <Select.Item label="UX " value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                </Select>

                </FormControl>
            </View> */}

            {/* <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Email</Text>
                <Input w={{ base: "100%", md: "25%" }}
                _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                style={{ height: width/8, width: '100%'}}
                placeholder="Enter your email address"
                value={email} onChangeText={text => setEmail(text)} />
            </View> */}


            </View>

            <View style={[styles.bottom]}>

              <Pressable onPress={submit}>
                <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={['#6654A8', '#423573']}>
                  <Text style={[styles.btnText]}>Submit</Text>
                </LinearGradient>
              </Pressable>

            </View>

        </View>

     </KeyboardAwareScrollView>
            
        </>
    );
};


const styles = StyleSheet.create({
    main: {
      height: "100%",
      backgroundColor: "#fff",
      paddingHorizontal:width/20,
      paddingVertical:width/20
    },
    middle: {
      width: "100%",
      height: 'auto'
    },
    bottom: {
      width: "100%"
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

  
export default EditProfile;