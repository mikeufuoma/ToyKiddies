import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'native-base';
var { width } = Dimensions.get("window");
import configData from "../../../../Config.json";

const SubChats = () => {
    const navigation = useNavigation();
    const [req, setReq] = useState([]);
    useEffect(()=>{
        getReq();
   },[])

    const getReq = async() => {
         
    const token = await AsyncStorage.getItem('token');
    return fetch(`${configData.SERVER_URL}/transaction/get-Chat`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": JSON.parse(token)
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          console.log(JSON.stringify(responseJson.data, null, 2));
            setReq(responseJson.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });


     }


const renderItem = ({ item }) => (

    <View style={styles.inputText}>
    <View style={styles.reqBox}>

       <Image size={width / 10} borderRadius={100} 
             source={{uri:`${configData.PIC_URL}/${item.acceptingUserId.profImage}`}}alt="image" style={{}}/>

             <View style={{}}>
                 <Text style={styles.firstName}>{item.acceptingUserId.firstName} {item.acceptingUserId.lastName}</Text>
                 <Text style={styles.location}>Sydney, Australia</Text>
             </View>
             {item.status === "success" ? <>
                <Pressable  onPress={()=> navigation.navigate('ChatDetails', {
                    data: item,
                    user: item.acceptingUserId
                })} style={[styles.btn, {backgroundColor:"#FD6562"}]}>
                    <Text style={{color:"#fff"}}>Chat Now</Text>
                </Pressable>
                  </> : <>
                <Pressable style={styles.btn}>
                    <Text style={{color:"#fff"}}>{item.status === "pending" && "Pending"} {item.status === "rejected" && "Rejected"}</Text>
                </Pressable>
                </>
              }
     </View>
</View>

    );

    return (
        <>

      <View>

        <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={[styles.body]} enableOnAndroid>


        {req && req.length > 0
                        ? <>
                        <FlatList
                              data={req}
                              renderItem={renderItem}
                              keyExtractor={item => item._id}
                              contentContainerStyle={{ paddingBottom: width/1.2 }}/>
                          
                       </> :  <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:width/25, marginTop:width/2, fontSize:width/20, fontWeight:'bold'}}>No Request Found</Text>
                            </View>}



            </KeyboardAwareScrollView>


      </View>
            
        </>
    );
};


const styles = StyleSheet.create({
    body: {
      backgroundColor: "#fff",
    },
    inputText: {
      paddingVertical: width / 20
    },
    reqBox:{
        flexDirection:"row",
        justifyContent:"space-around",
        borderColor:"#C1C4CD", 
        borderWidth:1, 
        borderRadius:width/80, 
        paddingLeft:width/40, 
        paddingVertical:width/20, 
    },
    firstName:{
        color:"#000", fontSize:width/25, fontWeight:"bold"
    },
    location:{
        color:"#6A7187", fontSize:width/35, marginTop:width/40
    },
    btn:{
        backgroundColor:"#423573", borderRadius:width/80, paddingLeft:width/20, paddingRight:width/20, paddingTop:width/40, paddingBottom:width/40,
        justifyContent:"center", alignItems:"center",
    }


  });
  

export default SubChats;