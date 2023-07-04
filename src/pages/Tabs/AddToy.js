import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image,  useToast, Icon, Input, Pressable, FormControl, Spinner, Select} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from "../../../Config.json";
import { format } from 'date-fns';
import RNFS from 'react-native-fs';
// import { dirPicutures } from './components/dirStorage';

import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'


var width = Dimensions.get("window").width;

const AddToy = () => {
    const navigation = useNavigation();


    const [{ cameraRef }, { takePicture }] = useCamera(null);
    const toast = useToast();
  
    const [showCamera, setShowCamera] = useState(false);
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [uploadImageOne, setUploadImageOne] = useState('');
    const [uploadImageTwo, setUploadImageTwo] = useState('');
    const [image, setImage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [toyState, setToyState] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [method, setMethod] = useState("");
    const [isActive, setIsActive] = useState(false);

    const isEnabled = title !== "" && category !== "" && description !== "";
  

    const handleBackButtonClick = () => {
          setShowCamera(false);
      }

      // useEffect(() => {
      //   setShowCamera(false);
      // },[])

      const requestCameraPermission = async (param) => {
        try {
          const status = await check(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
          )
          if (status !== RESULTS.GRANTED) {
            try {
              const status = await request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.CAMERA
                  : PERMISSIONS.ANDROID.CAMERA,
              )
              if (status !== RESULTS.GRANTED) {
                setShowCamera(false);
                return
              } 
              if(RESULTS.GRANTED === "granted"){
                console.log(RESULTS.GRANTED)
                setImage(param);
                setShowCamera(true);
               }
              else{
                console.log(RESULTS.GRANTED)
                setImage(param);
                setShowCamera(true)
              }
            } catch (err) {
              console.log(err)
            }
          }
          if(RESULTS.GRANTED === "granted"){
            console.log(RESULTS.GRANTED)
            setImage(param);
            setShowCamera(true);
           }
        } catch (err) {
          console.log(err)
        }


        };

      const [takingPic, setTakingPic] = useState(false);

      const captureHandle = async () => {
          // if (camera && takingPic) {
            setIsActive(true)
            setTakingPic(true);
      
            try {

                  const options = { base64: true, fixOrientation: true, writeExif: true };
                  const { uri } = await cameraRef.current.takePictureAsync(options);

                  // return console.log(JSON.stringify(data, null, 2));

                  const filePath = uri;
                  const pageFile = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  console.log(filePath + " " + pageFile);
                  if(image === "one") setImageOne(filePath);
                  if(image === "two") setImageTwo(filePath);
                  setShowCamera(false);

                  setIsActive(false)

                  // const fileName = format(new Date(), 'ddMMyy_HHmmSSS') + "toyImageOne.jpg";

                  // if( Platform.OS !== 'ios'){

                  //   const newFilePath = `${RNFS.PicturesDirectoryPath}/${fileName}`;


                  // // const newFilePath = RNFS.ExternalDirectoryPath + '/image.jpg';

                  //   RNFS.moveFile(filePath, newFilePath)
                  //     .then(() => {
                  //       console.log('FILE MOVED', filePath, newFilePath);
                  //       if(image === "one") setUploadImageOne(newFilePath);
                  //       if(image === "two")setUploadImageTwo(newFilePath);
                  //       console.log(newFilePath);
                  //       resolve(true);
                  //     })
                  //     .catch(error => {
                  //       console.log('moveFile error', error);
                  //       reject(error);
                  //     });


                  //  }
                  

            } catch (err) {
                  Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
                  return;
            } finally {
              setTakingPic(false);
            }
          // }
        };

     
       const submitTry = async() => {

            const token = await AsyncStorage.getItem('token');

            setIsLoading(true)
       
            const data = new FormData();
            
            const firstImage = format(new Date(), 'ddMMyy_HHmmSSS') + "toyImageOne";
            const secImage = format(new Date(), 'ddMMyy_HHmmSSS') + "toyImageTwo";
            // return console.log(firstImage + " " + secImage)
       
            data.append('imageOne',
            {
              name: firstImage,
              type: 'image/jpg',
              uri: imageOne,
            }
            );
            data.append('imageTwo',
            {
              name: secImage,
              type: 'image/jpg',
              uri: imageTwo,
            }
            );
            data.append('title', title);
            data.append('gender', gender);
            data.append('category', category);
            data.append('description', description);
            data.append('ageRange', ageRange);
            data.append('toyState', toyState);
            data.append('requestType', method);
           //  data.append('location', location)
       
       
       
           return  fetch(`${configData.SERVER_URL}/toy/add-toy`, {
             method: "post",
             headers: {
               "content-type": "multipart/form-data",
               "x-auth-token": JSON.parse(token)
             },
             body: data 
               })
             .then((response) => response.json())
             .then((responseJson) => {
               console.log(responseJson)
               if(responseJson.status === "success"){
                  setImageOne();
                  setImageTwo();
                  setTitle();
                  setCategory();
                  setDescription();
                  setGender();
                  setToyState();
                  setAgeRange();
                  setMethod();
                   setIsLoading(false);

                  //  console.log(JSON.stringify(responseJson.toys))
                   navigation.navigate('ToyDetails', {
                    data: responseJson.toys,
                    owner:"yes"
                  })
                    // return  toast.show({
                    //   description: responseJson.message
                    // })
                }
                if(responseJson.status === "error"){
                     setIsLoading(false);
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

        <View style={[styles.body]}>

          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6654A8" />
       
      {isLoading ? <>
          
        <View style={{
             flex: 1, width: '100%',
             backgroundColor: '#fff',opacity: 0.7,
            justifyContent:'center',
            alignItems:'center' }}>
                 <Image source={require('../../../assets/images/toykiddieIcon.png')} style={{ resizeMode: 'contain'}} />
                 <Spinner color='#6654A8' style={{fontSize:width/2, marginTop:width/20 }}  />
            </View>
      
         </>
          
          :
        <>  

            {showCamera && <>

              <LinearGradient style={[{paddingHorizontal:width/20, justifyContent:"flex-end", paddingBottom:width/10}]} colors={['#6654A8', '#423573']}>


                  <View style={{ height: hp('20%'), flexDirection: 'row', paddingTop:hp('12%')}}>
                            <TouchableOpacity onPress={handleBackButtonClick} style={{ marginBottom: width / 20 }}>
                                  <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#fff" }} />
                              </TouchableOpacity>
                              <View style={{paddingLeft:wp('30%')}}>
                                <Text style={{ fontSize:width/18, color: "#fff", fontWeight: "bold" }}>{(image === "one")? "Front" : "Back"}</Text>
                              </View>
                        </View>

                  <View style={{ height: hp('50%')}}>
      
                      <RNCamera 
                        ref={cameraRef}
                        captureAudio={false}
                        style={[StyleSheet.absoluteFill, {borderWidth:2, borderColor: '#fff', borderStyle:"dashed"}]}
                        type={RNCamera.Constants.Type.back}
                        androidCameraPermissionOptions={{
                          title: 'Permission to use camera',
                          message: 'We need your permission to use your camera',
                          buttonPositive: 'Ok',
                          buttonNegative: 'Cancel',
                        }}/>

                      </View>


                  <View style={{ height: hp('30%'), justifyContent:"flex-start", paddingTop:hp('2%')}}>
                        <Text style={{ fontSize:width/30, color: "#fff", textAlign: 'center' }}>Position all 4 corners of the front clearly in the frame and remove any cover.</Text>

                        <View style={{width:"100%", alignItems:"center", justifyContent: 'center', paddingTop:wp('10%')}}>
                          {isActive ?<>
                             <Spinner color='#fff' style={{fontSize:width/2, marginTop:width/20 }}  /> 
                             </>
                             :<>
                            <TouchableOpacity onPress={captureHandle} style={{backgroundColor:"#FFFFFF", width:width/5, height:width/5, borderRadius:width/5}}/>
                          </> }
                          </View>
                    </View>

              </LinearGradient>
                        
                </>
              }

              
          {(!showCamera) && <>

              <View style={styles.boxOne}>
                  <LinearGradient style={[styles.boxOne, {width:"100%", justifyContent:"center", alignItems:"flex-end", flexDirection:"row", paddingBottom:width/20}]} colors={['#6654A8', '#423573']}>
                          <Text style={{ fontSize:width/15, color: "#fff", fontWeight: "bold" }}>Add Toy</Text>
                      </LinearGradient>
                  </View>
                  
                <KeyboardAwareScrollView extraHeight={8}
                // resetScrollToCoords={{ x: 0, y: 0 }}
                style={[styles.main]} enableOnAndroid>
                  <View style={styles.main}>

                      <View style={styles.boxTwo}>

                      
              <View style={{flexDirection:"row", justifyContent: "space-between", marginVertical:width/10}}>

                    <TouchableOpacity onPress={() => requestCameraPermission("one")} style={{width: '48%', height: hp('20%'), borderWidth:2, borderColor: '#423573', borderStyle:"dashed", justifyContent: 'center', alignItems: 'center'}}>

                          {imageOne !== '' ? (
                              <Image
                              style={[StyleSheet.absoluteFill]}
                              source={{uri:imageOne}} alt=""/>
                          ) : <>

                              <Image source={require('../../../assets/images/Imagefill.png')} style={{ resizeMode: 'contain' }} alt="" />
                              <Text style={{fontSize:wp('4%'), color: '#423573', fontWeight: 'bold', marginTop: width/20}}>Take Front Photo</Text>
                          </>}

                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => requestCameraPermission("two")} style={{width: '48%', height: hp('20%'), borderWidth:2, borderColor: '#423573', borderStyle:"dashed", justifyContent: 'center', alignItems: 'center'}}>

                          {imageTwo !== '' ? (
                              <Image
                              style={[StyleSheet.absoluteFill]}
                              source={{ uri: imageTwo }} alt=""/>
                          ) : <>

                              <Image source={require('../../../assets/images/Imagefill.png')} style={{ resizeMode: 'contain' }} alt="" />
                              <Text style={{fontSize:wp('4%'), color: '#423573', fontWeight: 'bold', marginTop: width/20}}>Take Back Photo</Text>
                          </>}

                        </TouchableOpacity>

                  </View>

                  <View>

                            <View style={styles.inputText}>
                                  <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Title</Text>
                                  <Input w={{ base: "100%", md: "25%" }}
                                  style={{ height: width/8}}
                                  _focus={{ borderColor: '#C1C4CD', backgroundColor: '#fff' }}
                                  value={title} onChangeText={text => setTitle(text)}
                                  placeholder="Add a descriptive title" />
                              </View>

                              
                              <View style={styles.inputText}>
                                  <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Description</Text>
                                  <Input w={{ base: "100%", md: "25%" }}
                                  style={{ height: width/4}}
                                  _focus={{ borderColor: '#C1C4CD', backgroundColor: '#fff' }}
                                  value={description} onChangeText={text => setDescription(text)}
                                  placeholder="Add a descriptive title" />
                              </View>

                        

                                  
                              <View style={styles.inputText}>
                                  <FormControl>
                                      <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Category</Text>

                                      <Select 
                                          mode="dropdown"
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholder="Select toy category"
                                          placeholderStyle={{ color: "#bfc6ea" }}
                                          placeholderIconColor="#007aff"
                                          selectedValue={category}
                                          style={{ height: width/8, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                                              <Select.Item label="interactive " value="interactive"/>
                                              <Select.Item label="puzzle" value="puzzle"/>
                                              <Select.Item label="puppet " value="puppet"/>
                                              <Select.Item label="newBorns" value="newBorns"/>
                                              <Select.Item label="figures " value="figures"/>
                                              <Select.Item label="Cars" value="Cars" />
                                              <Select.Item label="creativity " value="creativity"/>
                                      </Select>
                                    </FormControl>
                                </View>
 
                              <View style={styles.inputText}>
                                  <FormControl>
                                      <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Toy Gender</Text>

                                      <Select 
                                          mode="dropdown"
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholder="Select toy gender"
                                          placeholderStyle={{ color: "#bfc6ea" }}
                                          placeholderIconColor="#007aff"
                                          selectedValue={gender}
                                          style={{ height: width/8, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                                              <Select.Item label="Male " value="male" />
                                              <Select.Item label="Female" value="female" />
                                              <Select.Item label="Unisex" value="unisex" />
                                      {/* {city.map((c, index) => (
                                          <Select.Item key={index + 1} label={c.name} value={c._id} />
                                          ))} */}
                                      </Select>
                                  

                                      </FormControl>
                                  </View>


                              <View style={styles.inputText}>
                                  <FormControl>
                                      <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Age Range</Text>

                                      <Select 
                                          mode="dropdown"
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholder="Select toy gender"
                                          placeholderStyle={{ color: "#bfc6ea" }}
                                          placeholderIconColor="#007aff"
                                          selectedValue={ageRange}
                                          style={{ height: width/8, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) => setAgeRange(itemValue)}>
                                              <Select.Item label="0-2" value="0-2" />
                                              <Select.Item label="3-6" value="3-6" />
                                              <Select.Item label="7-9" value="7-9" />
                                              <Select.Item label="10+" value="10+" />
                                      {/* {city.map((c, index) => (
                                          <Select.Item key={index + 1} label={c.name} value={c._id} />
                                          ))} */}
                                      </Select>
                                  

                                      </FormControl>
                                  </View>


                                      
                              <View style={styles.inputText}>
                                  <FormControl>
                                      <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Toy State</Text>

                                      <Select 
                                          mode="dropdown"
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholder="Select the state of your toy"
                                          placeholderStyle={{ color: "#bfc6ea" }}
                                          placeholderIconColor="#007aff"
                                          selectedValue={toyState}
                                          style={{ height: width/8, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) => setToyState(itemValue)}>
                                              <Select.Item label="New " value="new"/>
                                              <Select.Item label="Used" value="used"/>
                                      </Select>
                                      </FormControl>
                                  </View>

                                     
                                  <View style={styles.inputText}>
                                  <FormControl>
                                      <Text style={{ alignSelf: 'flex-start', fontSize: width / 30, color: "#6A7187", marginBottom: width / 40 }}>Method</Text>

                                      <Select 
                                          mode="dropdown"
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholder="Select method(Gift/Swap)"
                                          placeholderStyle={{ color: "#bfc6ea" }}
                                          placeholderIconColor="#007aff"
                                          selectedValue={method}
                                          style={{ height: width/8, width: '100%'}}
                                          onValueChange={(itemValue, itemIndex) => setMethod(itemValue)}>
                                              <Select.Item label="Gift Toy" value="gift"/>
                                              <Select.Item label="Swap Toy" value="swap"/>
                                      </Select>
                                    </FormControl>
                                </View>


                    <Pressable disabled={!isEnabled} onPress={submitTry}>
                      <LinearGradient style={[(isEnabled) ? styles.disabledBtn : styles.loginBtn]} colors={isEnabled ? ['#6654A8', '#423573'] : ['#DDDFE4', '#DDDFE4']}>
                        <Text style={[(isEnabled) ? styles.btnText : styles.btnTextOne]}>Upload</Text>
                      </LinearGradient>
                    </Pressable>

                          </View>


                      </View>

                  </View>
                  </KeyboardAwareScrollView>

                </>}


    
        </>}
         </View>


            
        </>
    );
};



const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: "#fff",
    },
    main:{
       height: hp('150%'),
       backgroundColor:"#fff"
    },
    boxOne:{
        height: hp('15%')
    },
    boxTwo:{
        height: hp('80%'),
        paddingHorizontal:width/15,
    },
    circle:{
        width:wp('15%'), 
        height:wp('15%'),  
        justifyContent: 'center',  
        alignItems: 'center', 
        backgroundColor:"#423573", 
        color: "#fff", 
        fontWeight: "bold",
        borderRadius:width/2
    },
    inputText:{
        marginVertical:width/40
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

export default AddToy;