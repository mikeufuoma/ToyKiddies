import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useToast, Icon, Input, Pressable, FormControl, Select,Image, Spinner } from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
var { width } = Dimensions.get("window");
import configData from "../../Config.json";

// import {GOOGLE_MAPS_APIKEY} from "@env"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
// AIzaSyDbZOsA6Oo5dfsG4HE9jkUYmEznCwiZrEY
const mapKey = "AIzaSyDbZOsA6Oo5dfsG4HE9jkUYmEznCwiZrEY"
// Geocoder.init(GOOGLE_MAPS_APIKEY);
Geocoder.init(mapKey);

const Register = () => {

  const [show, setShow] = useState(false);
  const phoneInput = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }


  const navigation = useNavigation();
  const toast = useToast();
  const [profImage, setProfImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isEnabled = firstname.length > 0 && lastname.length > 0 && gender.length > 0;


  const handleFilePicker = async() => {
    try{
      let options = {
        storageOptions:{
          path:'image'
        },
      };

   

      launchImageLibrary(options, response => {

        if(response.didCancel) {
             console.log('User cancelled image picker');
            //  alert('User cancelled image picker');
        } else if (response.error) {
             console.log('ImagePicker Error: ', response.error);
             alert('ImagePicker Error: ' + response.error);
        } else {
          console.log(JSON.stringify(response.assets[0]), null, 2)
          setSelectedImage(response.assets[0].uri);
          setProfImage(response.assets[0]);
        }



        // setSelectedImage(response.assets[0].uri);
        // setProfImage(response.assets[0]);
        // console.log(response)
      } )
  
    }catch(err){
        console.log(err);
    }
  }
  
  const selectAddress = async(address, destination) => {

  }

  const submit = async() => {

    if(profImage === ""){
      toast.show({
        description: "Select Image"
       })
       return
     }
     if(state === ""){
       toast.show({
         description: "Select your location"
        })
        return
      }

     const token = await AsyncStorage.getItem('token');
     setIsLoading(true)

     const data = new FormData();

     data.append('profImage', {
       name: profImage.fileName,
       type: profImage.type,
       uri: Platform.OS === 'ios' ? profImage.uri.replace('file://', '') : profImage.uri,
     });
     data.append('firstname', firstname);
     data.append('lastname', lastname);
     data.append('gender', gender);
     data.append('state', state);
     data.append('long', long);
     data.append('lat', lat);
    //  data.append('location', location)



    return  fetch(`${configData.SERVER_URL}/user/user-Details`, {
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
          setIsLoading(false);
          navigation.navigate('Success', {
              nav: "Preference",
              msg:"You have updated your profile on ToyKiddies successful"
            });
         }
         if(responseJson.status === "error"){
             setIsLoading(false)
              return  toast.show({
                description: responseJson.message
              })
         }
      })
      .catch((error) => {
        setIsLoading(false)
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
                 <Image source={require('../../assets/images/toykiddieIcon.png')} style={{ resizeMode: 'contain'}} alt="toykiddieIcon" />
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
              <Text style={[styles.welcomeText]}>Personal Details</Text>
            </View>

            <View style={[styles.middle]}>

                  <TouchableOpacity onPress={()=> handleFilePicker()} style={{flex:1, paddingHorizontal:width/10, alignItems:"center", justifyContent: 'center'}}>
                      <Image source={ selectedImage.length > 0 ? {uri: Platform.OS === 'ios' ? selectedImage.replace('file://', '') : selectedImage} :  require('../../assets/images/upload.png')}
                        borderRadius={100}  alt="toykiddieIcon"
                      style={{  width:width/4.5, height:width/4.5, backgroundColor:"#6654A8"}} />  
                  </TouchableOpacity>

                <Text style={{fontSize:width/25, color:"#6654A8", textAlign:"center", marginTop:width/40 }}>Upload Photo</Text>
            

              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>First Name</Text>
                <Input w={{ base: "100%", md: "25%" }} type={"text"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={firstname} onChangeText={text => setFirstname(text)}
                  InputRightElement={
                    <Pressable onPress={() => setFirstname("")}>
                      <Icon as={<Ionicons name={(firstname.length > 0 ) ? "close-circle-outline" : null} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Enter your first name" />
               </View>



              <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Last Name</Text>
                <Input w={{ base: "100%", md: "25%" }} type={"text"}
                  style={{ height: width/8}}
                  _focus={{ borderColor: '#000', backgroundColor: '#fff' }}
                  value={lastname} onChangeText={text => setLastname(text)}
                  InputRightElement={
                    <Pressable onPress={() => setLastname("")}>
                      <Icon as={<Ionicons name={(lastname.length > 0 ) ? "close-circle-outline" : null} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Enter your last name" />
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
              </Select>

            </FormControl>
            </View>

            <View style={styles.inputText}>
                <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginVertical: width / 40 }}>Select your location</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}style={styles.stateBox}>
                    <Text style={styles.stateText}>{state === "" ? "Click Here" :  state}</Text>
                    <Ionicons name={'arrow-down-sharp'} size={width / 15} />
                </TouchableOpacity>
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

        </>}
      </SafeAreaView>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{flex:1, backgroundColor:"#fff"}}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={{flex:1, backgroundColor:"transparent"}}>
            <TouchableOpacity onPress={() =>  setModalVisible(!modalVisible)} style={{flex:1, backgroundColor:"#000", opacity:0.4}}/>

            <View style={styles.viewBoxTwo}>

{/*                
          <GooglePlacesAutocomplete
            placeholder="Search Delivery Address"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"}
            keyboardAppearance={"light"}
            listViewDisplayed={true} // true/false/undefined
            fetchDetails={true}
            isRowScrollable={true}
            onPress={async (data, details = null) => {
                try {
                  const json = await Geocoder.from(details.formatted_address);
                  const location = json.results[0].geometry.location;
                  // await makeOrder(details.formatted_address, {
                  //   latitude: location.lat,
                  //   longitude: location.lng,
                  // })
                  // await makeOrder(details.formatted_address, {
                  //   latitude: location.lat,
                  //   longitude: location.lng,
                  // })
                } catch (e) {
                  console.log(e);
                }
            }}
            getDefaultValue={() => ""}
            query={{
              key: "AIzaSyDbZOsA6Oo5dfsG4HE9jkUYmEznCwiZrEY",
              language: "en", 
              types: "", 
            }}
            styles={{
              description: {
                fontWeight: "bold",
              },
              predefinedPlacesDescription: {
                color: "#000",
              },
              textInputContainer: {
                backgroundColor: "#fff",
                borderBottomWidth: 0,
                borderTopWidth: 0,
                zIndex: 500,
                elevation: 8,
                marginTop: 10,
              },
              textInput: {
                backgroundColor: "white",
                borderBottomWidth: 0.1,
                borderColor: "red",
                color: "#000",
              },
              listView: {
                marginTop: 5,
                elevation: 1,
                backgroundColor: "#fff",
                zIndex: 1500,
              },
            }}
            currentLocation={false} 
            currentLocationLabel="Use Current location"
            nearbyPlacesAPI="GooglePlacesSearch" 
            GooglePlacesSearchQuery={{
              rankby: "distance",
              type: "",
            }}
            GooglePlacesDetailsQuery={{
              fields: "formatted_address",
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
            ]}
            debounce={200}
          /> */}
              

              <Text style={{marginTop: width/10, fontSize:width/25, color: '#000', marginHorizontal:width/15}}>Search for your location</Text>
            <GooglePlacesAutocomplete
                placeholder='Search location'
                minLength={2}
                returnKeyType={'default'}
                fetchDetails={true}
                currentLocation = {false}
                isRowScrollable={true}
                keepResultsAfterBlur={false}
                enablePoweredByContainer = { false }
                styles={{
                  textInputContainer: {
                    marginTop: width/40,
                    paddingHorizontal:width/15
                  },
                textInput: {
                  height: width/8,
                  color: 'black',
                  fontSize: width/30,
                  backgroundColor: '#ededed'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                listView: {
                  position: 'relative',
                  zIndex: 3,
                  marginTop: 0,
                  padding: 0
                },
                row: {
                backgroundColor: '#FFFFFF',
                height: "auto",
                flexDirection: 'row',
                paddingHorizontal:width/15
                },
                separator: {
                height: 0.5,
                marginHorizontal:width/15,
                backgroundColor: '#c8c7cc',
                },
                description: {},
                loader: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: width/20,
                },
              }}
              onPress={async(data, details) => {
                try {
                  // console.log(JSON.stringify(data, null, 2));
                  const json = await Geocoder.from(details.formatted_address);
                  const location = json.results[0].geometry.location;
                  console.log(JSON.stringify(location, null, 2))
                  setState(json.results[0].formatted_address);
                  setLong(location.lng)
                  setLat(location.lat)
                  // setCordinates([location.lng, location.lat]);

                  setModalVisible(!modalVisible);
                  // console.log(JSON.stringify(json, null, 2))
                  // console.log(JSON.stringify(json.results[0].formatted_address, null, 2));
                } catch (e) {
                  console.log(e);
                }
              }}
              query={{
                key:mapKey,
                language: 'en',
                types: "", 
              }}
              />

            </View>

          </View>
        </Modal>

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
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  middle: {
    width: "100%",
    height: 'auto'
  },
  bottom: {
    width: "100%",
    marginTop: width / 20
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
  stateBox:{
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
     borderWidth:1,
     borderColor: "#C1C4CD",
     paddingHorizontal:width/30,
     height: width/8, width: '100%'
  },
  stateText:{
    fontSize:width/35,
  },
  boxView:{
      backgroundColor: '#fff',
      height:"100%",
      padding:width/15
  },
  viewBoxTwo:{
    flex:1,  
    backgroundColor:"#fdfdfd", 
    borderTopLeftRadius:width/40,
    borderTopRightRadius:width/40,

  }

});


export default Register;