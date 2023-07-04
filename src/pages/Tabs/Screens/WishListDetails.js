import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Share,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, Input, Image, Pressable, useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import configData from "../../../../Config.json";


var width = Dimensions.get("window").width;

const WishListDetails = ({route}) => {

    const { data } = route.params;

    console.log(JSON.stringify(data, null, 2));

    const navigation = useNavigation();
    const [isActive, setIsActive] = useState(true);
    const toast = useToast();

    const handleBackButtonClick = () => {
        navigation.goBack(null);
        return true;
      }

    const request = (data) => {
        navigation.navigate('GiftRequest', {
            data: data.toyId
          });
    }

    const addWishlist = async() => {

     const token = await AsyncStorage.getItem('token');
    //  setIsLoading(true);

     return  fetch(`${configData.SERVER_URL}/toy/add-WishList/${data.toyId._id}`, {
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
                // setIsLoading(false);
                return  toast.show({
                    description: responseJson.message
                  })
            }
            if(responseJson.status === "error"){
                // setIsLoading(false);
                return  toast.show({
                  description: responseJson.message
                })
                 
            }
      })
      .catch((error) => {
          console.error(error);
        //   setIsLoading(false);
      })
    }
    

    const share = () => {
        Share.share({
          message: 'Toy Kiddies app',
          // url: 'https://play.google.com/store/apps/details?id=com.energie',
          // title: 'Wow, did you see that?',
        }, {
          // Android only:
          dialogTitle: 'Share Toy',
          // iOS only:
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter',
          ],
        });
      };
    return (
        <>
        <View style={[styles.body]}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6654A8" />

          <View style={styles.main}>

            <View style={styles.boxOne}>
                   <LinearGradient style={[styles.boxOne, {paddingHorizontal:width/20, justifyContent:"flex-start", alignItems:"flex-end", flexDirection:"row", paddingBottom:width/20}]} colors={['#6654A8', '#423573']}>
                        <TouchableOpacity onPress={handleBackButtonClick} style={{ paddingTop: width / 20 }}>
                            <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#fff" }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize:width/15, color: "#fff", marginLeft:wp("15%"), fontWeight: "bold" }}>Product Page</Text>
                    </LinearGradient>
                </View>
            
                <ScrollView 
                        style={styles.boxMain} 
                        contentContainerStyle={styles.contentContainer}>

                <View style={styles.boxTwo}>


                <View style={styles.toyBox}>
                    <View style={styles.boxTop}>
                        <TouchableOpacity style={styles.userBox}>
                            {/* <Image size={width / 16} borderRadius={100}  source={{
                        uri: `${configData.PIC_URL}/${data.userId.profImage}`}} alt="profile" />
                            <Text style={styles.userName}>{data.userId.firstName}</Text> */}
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.toyStatus}>{data.toyId.toyState}</Text>
                        </View>
                    
                     </View>
                    <View style={styles.middleBox}>
                        <Image  source={{uri:`${configData.PIC_URL}/${data.toyId.imageOne}`}}  style={{ resizeMode: 'contain', width:"100%", height:"100%" }}  alt="Toy image"/>
                     </View>
                    </View>

                    <View style={styles.description}>
                        <View style={{flexDirection:"row", justifyContent:"space-around", paddingHorizontal:width/20, paddingVertical:width/40}}>
                            <TouchableOpacity onPress={()=> setIsActive(true)} style={(isActive) ? styles.descBox : styles.descBoxTwo}>
                                <Text>Description</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> setIsActive(false)} style={(!isActive) ? styles.descBox : styles.descBoxTwo}>
                                <Text>Review</Text>
                            </TouchableOpacity>
                         </View>


                         <View style={styles.details}>
                             <Text style={styles.toyName}>{data.toyId.title}</Text>
                        {isActive ? 
                             <View>
                                <Text style={styles.descText}>{data.toyId.description}</Text>

                                {/* <Text style={styles.descText}>With soft fur and a friendly face, this teddy is sure to bring a smile to the face of anyone who holds it. Give this bear a second chance at happiness and make it a part of your family today!</Text> */}

                                <View style={{borderBottomWidth:2, borderBottomColor:"#E8EAED", borderTopWidth:2, borderTopColor:"#E8EAED", paddingTop:width/20, paddingBottom:width/20, justifyContent:"center", alignItems: "center"}}>
                                    <Text style={{color:"#6654A8", fontSize:width/32}}>Condition: {data.toyState}</Text>
                                    <Text style={{color:"#6654A8", fontSize:width/32, marginTop:width/20}}>For ages: {data.toyId.ageRange} </Text>

                                </View>
                                                 
                                <View style={styles.actions}>

                                        <TouchableOpacity onPress={() => share()}>
                                        <MaterialIcons name={'share-2'} size={width / 15} style={{ color: "#BDBDBD" }} />
                                        </TouchableOpacity>

                                            <Pressable onPress={() => request(data)}>
                                                <LinearGradient style={styles.btn} colors={['#6654A8', '#423573']}>
                                                    <Text style={styles.btnText}>{data.requestType === "gift" ? "Get" : "Swap"}</Text>
                                                </LinearGradient>
                                            </Pressable>

                                            <TouchableOpacity onPress={() => addWishlist()}>
                                            <MaterialIcons name={'heart'} size={width / 15} style={{ color: "#BDBDBD" }} />
                                            </TouchableOpacity>
                                </View>

                             </View>
                            : 
                            <View style={{marginVertical:width/40}}>

                                <Input w={{base: "100%" }}  size="lg"
                                    style={{ height: width/9, marginVertical:width/80}}
                                    _focus={{ borderColor: '#E8EAED', color:"#061237",  borderWidth: 1.5, backgroundColor:"transparent"}}
                                    InputLeftElement={<Image size={width / 16} borderRadius={100} source={{uri: "https://wallpaperaccess.com/full/317501.jpg"}} style={{marginLeft:width/20}} alt="" />} placeholder="Add a comment" />

                                    <View style={{backgroundColor:"#FD6562", paddingHorizontal:width/10, paddingVertical:width/20, marginVertical:wp("5%"), borderTopLeftRadius:width/40,  borderTopRightRadius:width/40}}>
                                        <Text style={{textAlign:"center", color:"#fff", fontSize:width/25, fontWeight:"bold"}}>Please rate your experience with this user and this toy.</Text>
                                    </View>
                                    <View style={{flexDirection:"row", justifyContent:"flex-end", paddingRight:wp("5%")}}>
                                            <Text style={[styles.revBtn, {marginRight:wp('5%')}]}>Not now</Text>
                                            <Text style={styles.revBtn}>Submit</Text>
                                    </View>

                            </View>
                            }



                         </View>



                            {/* <View style={{paddingTop:width/8}}>
                                  <Text>rszdxfcghjkl</Text>
                              </View> */}

                    {/* </KeyboardAwareScrollView> */}

                    </View>
    

                </View>

            </ScrollView>

            </View>

         </View>


            
        </>
    );
};



const styles = StyleSheet.create({
    body: {
      height: hp('100%'),
      backgroundColor: "#fff",
    },
    main:{
       height: hp('100%'),
       backgroundColor:"#F7F9FC"
    },
    boxOne:{
        height: hp('15%')
    },
    boxMain:{
        height: hp('85%'),
    },
    contentContainer:{
        height: 'auto',
        paddingBottom: width/0.9
    },
    boxTwo:{
        height: hp('85%'),
        paddingHorizontal:width/20
    },  text:{
        fontSize:width/20, 
        color:"#fff",
        marginHorizontal:width/20
    },
    description:{
        height:'85%',
        backgroundColor:"#F9F9F9",
    },
    toyBox:{
        backgroundColor:"#fff",
        width:"100%",
        height: hp('30%'),
        marginTop:width/20,
        padding:width/20
    },
    boxTop:{
        flexDirection:"row", 
        justifyContent: "space-between",
        height:"15%"
    },
    middleBox:{
        height:"85%"
    },
    userBox:{
        flexDirection:"row",
        alignItems:"center"
    },
    userName:{
        fontSize:width/25,
        marginLeft:width/50
    },
    toyStatus:{
        fontSize:width/25,
        backgroundColor:"#FFE0E0",
        padding:width/80,
        borderRadius:width/20,
        color:"#83899B"
    },
    toyName:{
        fontSize:width/18,
        fontWeight:"bold",
        textAlign:"center",
        marginVertical:width/40
    },
    actions:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        marginTop:width/40
    },
    btn: {
      marginHorizontal: width / 20,
      width: width/2.5,
      borderRadius: width / 80,
      padding: width / 35,
      elevation: 5,
    },
    btnText: {
      color: "#fff",
      textAlign: "center",
      fontSize: width / 25,
      fontWeight: "500",
      marginTop: width / 80
    },
    descBox:{
        width:"50%",  backgroundColor:"#fff", justifyContent:"center", alignItems: "center", paddingHorizontal:width/20, paddingVertical:width/40, borderRadius:width/40
    },
    descBoxTwo:{
        width:"50%",  backgroundColor:"transparent", justifyContent:"center", alignItems: "center", paddingHorizontal:width/20, paddingVertical:width/40
    },
    details:{
        backgroundColor:"#fff",
        paddingHorizontal:width/20,
        paddingVertical:width/20
    },
    descText:{
        textAlign:"justify", paddingVertical:width/40, fontSize:width/25
     },
     revBtn:{
        paddingVertical:width/80, fontSize:width/25, color:"#6654A8"
     }
});

export default WishListDetails;