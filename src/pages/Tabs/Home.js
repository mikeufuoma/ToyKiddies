import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Share,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/Feather';
import {Icon, Input, Image, Pressable, useToast } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import configData from "../../../Config.json";

var width = Dimensions.get("window").width;



const Home = () => {

    const [active, setActive] = useState("all");
    const [toys, setToys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState('')
    const navigation = useNavigation();
    const toast = useToast();

    useEffect(()=>{
         getToys();
    },[])


    const request = (data) => {
        navigation.navigate('GiftRequest', {
            data: data
          });
    }
    
  const getToys = async(data) => {
        setActive(data)
        setIsLoading(true);
         
    const token = await AsyncStorage.getItem('token');
    return fetch(`${configData.SERVER_URL}/toy/get-toys`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": JSON.parse(token)
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        if (responseJson.status === 'success') {
          setToys(responseJson.data);
          setIsLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });


     }


    const giftToys = async(data) => {
        setActive(data)
        setIsLoading(true);
         
    const token = await AsyncStorage.getItem('token');
    return fetch(`${configData.SERVER_URL}/toy/gift-toys`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": JSON.parse(token)
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        if (responseJson.status === 'success') {
          setToys(responseJson.data);
          setIsLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });


     }

     const swapToys = async(data) => {
        setActive(data)
        setIsLoading(true);
         
    const token = await AsyncStorage.getItem('token');
    return fetch(`${configData.SERVER_URL}/toy/swap-toys`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": JSON.parse(token)
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        if (responseJson.status === 'success') {
          setToys(responseJson.data);
          setIsLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });


     }

     const addWishlist = async(data) => {

        const token = await AsyncStorage.getItem('token');
       //  setIsLoading(true);
   
        return  fetch(`${configData.SERVER_URL}/toy/add-WishList/${data._id}`, {
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
      
    const search = async() => {
        
  const token = await AsyncStorage.getItem('token');

        return fetch(`${configData.SERVER_URL}/toy/search`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(token)
          },
          body: JSON.stringify({
            inputText,
          }) 
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            setToys(responseJson.data);
          })
          .catch((error) => { 
            console.error(error);
          });
      }
    


const renderItem = ({ item }) => (

    <View style={styles.toyBox}>
       <View style={styles.boxTop}>
        <TouchableOpacity style={styles.userBox}>
            <Image size={width / 16} borderRadius={100} source={{
                        uri: `${configData.PIC_URL}/${item.owner.profImage}`
                        }} alt="profile" />
            <Text style={styles.userName}>{item.owner.firstName}</Text>
        </TouchableOpacity>
        <View>
            <Text style={styles.toyStatus}>{item.toyState}</Text>
        </View>
       
       </View>
        <TouchableOpacity onPress={() => navigation.navigate('ToyDetails', {
            data: item,
            owner:"no"
          })} style={styles.middleBox}>
            <Image  source={{uri:`${configData.PIC_URL}/${item.imageOne}`}} style={{ resizeMode: 'contain', width:"100%", height:"100%" }}  alt="Toy image"  />
        </TouchableOpacity>
        <View style={styles.bottomBox}>
            <Text style={styles.toyName}>{item.title}</Text>
            
            <View style={styles.actions}>

            <TouchableOpacity onPress={() => share()}>
            <MaterialIcons name={'share-2'} size={width / 15} style={{ color: "#BDBDBD" }}/>
            </TouchableOpacity>
                <Pressable onPress={() => request(item)}>
                    <LinearGradient style={styles.btn} colors={['#6654A8', '#423573']}>
                        <Text style={styles.btnText}>{item.requestType === 'swap' ? "Swap" : "Get"}</Text>
                    </LinearGradient>
                </Pressable>

                <TouchableOpacity onPress={() => addWishlist(item)}>
                <MaterialIcons name={'heart'} size={width / 15} style={{ color: "#BDBDBD" }} />
                </TouchableOpacity>

            </View>

        </View>
    </View>

    );


    return (
        <>
        <View style={[styles.body]}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" />

            <View style={styles.main}>
                <View style={styles.boxOne}>
                   <LinearGradient style={[styles.boxOne, {paddingHorizontal:width/20, justifyContent:"flex-end", paddingBottom:width/10}]} colors={['#6654A8', '#423573']}>

                    <View style={{flexDirection:"row", justifyContent:"center", marginBottom:width/20}}>
                        <TouchableOpacity style={{alignItems:"center"}} onPress={()=> getToys('all')}>
                           <Text style={styles.text}>All</Text>
                           <View style={(active === 'all') ? {borderBottomWidth: 2, borderColor:"#E8EAED", width: wp("8%")} : null} ></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:"center"}} onPress={()=> giftToys('get')}>
                            <Text style={styles.text}>Get</Text>
                           <View style={(active === 'get') ? {borderBottomWidth: 2, borderColor:"#E8EAED", width: wp("8%")} : null} ></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:"center"}} onPress={()=> swapToys('swap')}>
                           <Text style={styles.text}>Swap</Text>
                           <View style={(active === 'swap') ? {borderBottomWidth: 2, borderColor:"#E8EAED", width: wp("8%")} : null} ></View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Input w={{base: "100%" }}  size="lg"
                        style={{ height: width/9, color:"#fff"}}
                        _focus={{ borderColor: '#fff', color:"#fff",  borderWidth: 1.5, backgroundColor:"transparent"}}
                        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml="4" color="#fff" />} placeholder="What are you looking for?" 
                        value={inputText}
                        onChangeText={text =>  { setInputText(text); search(text); }}/>
                    </View>

                    </LinearGradient>
                </View>
            

                <View style={styles.boxTwo}>
        
        {/* {isLoading ? <>
              
              <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                
              </View>

             </> : <> */}

            {toys && toys.length > 0
                        ? <>
                        <FlatList
                              data={toys}
                              renderItem={renderItem}
                              keyExtractor={item => item._id}
                              contentContainerStyle={{ paddingBottom: width/1.2 }}/>

                              {/* <View style={{paddingTop:width/8}}>
                              </View> */}

                     
                          
                       </> :  <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:width/25, marginTop:width/2, fontSize:width/20, fontWeight:'bold'}}>No Toy Found</Text>
                                <Text style={{fontSize:width/25, fontSize:width/20, fontWeight:'bold'}}>in your location</Text>
                            </View>}

             {/* </>} */}

                </View>



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
       height: hp('100%')
    },
    boxOne:{
        height: hp('30%')
    },
    boxTwo:{
        minHeight: hp('70%'),
        backgroundColor:"#F9F9F9",
        paddingHorizontal:width/20
    },
    text:{
        fontSize:width/20, 
        color:"#fff",
        marginHorizontal:width/20
    },
    toyBox:{
        backgroundColor:"#fff",
        width:"100%",
        height: hp('45%'),
        marginTop:width/20,
        padding:width/20
    },
    boxTop:{
        flexDirection:"row", 
        justifyContent: "space-between",
        height:"15%"
    },
    middleBox:{
        height:"55%"
    },
    bottomBox:{
        height:"25%"
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
        borderRadius:width/80,
        color:"#83899B"
    },
    toyName:{
        fontSize:width/18,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:width/40
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
      padding: width / 55,
      elevation: 5,
    },
    btnText: {
      color: "#fff",
      textAlign: "center",
      fontSize: width / 25,
      fontWeight: "500",
      marginTop: width / 80
    },

});

export default Home;