import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Input, Image } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import configData from "../../../Config.json";

var width = Dimensions.get("window").width;

const toys = [
    {name: 'Theresa', location: 'Sydney, Australia', km:"2.3km", image:"../../../assets/images/toy1.png"},
    {name: 'Annette', location: 'Melbourne, Australia', km:"4.4km", image:"../../../assets/images/toy1.png"},
    {name: 'Eleanor ', location: 'Brisbane, Australia', km:"7.4km", image:"../../../assets/images/toy1.png"},
    {name: 'Theresa', location: 'Sydney, Australia', km:"2.3km", image:"../../../assets/images/toy1.png"},
    {name: 'Annette', location: 'Melbourne, Australia', km:"4.4km", image:"../../../assets/images/toy1.png"},
    {name: 'Eleanor ', location: 'Brisbane, Australia', km:"7.4km", image:"../../../assets/images/toy1.png"},
    {name: 'Theresa', location: 'Sydney, Australia', km:"2.3km", image:"../../../assets/images/toy1.png"},
    {name: 'Annette', location: 'Melbourne, Australia', km:"4.4km", image:"../../../assets/images/toy1.png"},
    {name: 'Eleanor ', location: 'Brisbane, Australia', km:"7.4km", image:"../../../assets/images/toy1.png"},
]
  


const Chats = () => {

    const [active, setActive] = useState("all");
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [user, setUser] = useState('');
    const navigation = useNavigation();

    const getChat = async() => {
    
        const token = await AsyncStorage.getItem('token');
        return fetch(`${configData.SERVER_URL}/chat/initial-chat`, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "x-auth-token": JSON.parse(token)
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(JSON.stringify(responseJson.data[0].users[1].firstName, null, 2));
            if (responseJson.status === 'success') {
                setChat(responseJson.data);
                setName(responseJson.data[0].users[1].firstName);
                setImage(responseJson.data[0].users[1].profImage);
                setUser(responseJson.data[0].users[1])
            }
          })
          .catch((error) => {
            console.error(error);
          });
    
    }
    useEffect(() => {
        // const interval=setInterval(()=>{
            getChat();
        // },3000)
        
        // return()=>clearInterval(interval)
    },[])



    const getToys = (data) => {
        setActive(data)
     }


     const renderItem = ({ item }) => (

        <TouchableOpacity onPress={()=> navigation.navigate('MainChat', {
            data: item,
            user: user
        })}  style={styles.chatBox}>
            <View style={styles.imgBox}>
               <Image size={width / 8} borderRadius={100} source={{uri:`${configData.PIC_URL}/${image}`}} alt="profile" style={styles.imgBorder}/>
            </View>
            <View style={styles.nameBox}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.city}>{'Sydney, Australia'}</Text>
            </View>
            <View style={styles.kmBox}>
                {/* <Text style={styles.kmText}>{item.km}</Text> */}
                <MaterialIcons name={'map'} size={width / 15} style={styles.map} />
            </View>
            
        </TouchableOpacity>
    
        );


    return (
        <>
        <View style={[styles.body]}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6654A8" />

            <View style={styles.main}>
                <View style={styles.boxOne}>
                   <LinearGradient style={[styles.boxOne, {paddingHorizontal:width/20, justifyContent:"center", alignItems:"center", paddingTop:wp("5%")}]} colors={['#6654A8', '#423573']}>
                        <View style={{paddingBottom:wp("5%")}}>
                           <Text style={[styles.text, {fontWeight:"bold", fontSize:wp('6%')}]}>Chat</Text>
                        </View>
                    <View>

                        <Text style={{fontSize:width/20, color:"#cdcdcd"}}>Swappers, Givers or by Location</Text>
                        {/* <Input w={{base: "100%" }}  size="lg"
                        style={{ height: width/9}}
                        _focus={{ borderColor: '#fff', color:"#fff",  borderWidth: 1.5, backgroundColor:"transparent"}}
                        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml="4" color="#fff" />} placeholder="Swappers, Givers or by Location" /> */}
                    </View>

                    <View style={{flexDirection:"row", justifyContent:"center", marginTop:width/20}}>
                        <TouchableOpacity style={{alignItems:"center"}} onPress={()=> getToys('all')}>
                           <Text style={styles.text}>Chatted</Text>
                           <View style={(active === 'all') ? {borderBottomWidth: 2, borderColor:"#E8EAED", width: wp("17%")} : null} ></View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{alignItems:"center"}} onPress={()=> getToys('get')}>
                            <Text style={styles.text}>Online</Text>
                           <View style={(active === 'get') ? {borderBottomWidth: 2, borderColor:"#E8EAED", width: wp("14%")} : null} ></View>
                        </TouchableOpacity> */}
                    </View>


                    </LinearGradient>
                </View>
            

                <View style={styles.boxTwo}>


            {chat && chat.length > 0
                        ? 
                        <FlatList
                              data={chat}
                              renderItem={renderItem}
                              keyExtractor={item => item._id}
                              contentContainerStyle={{ paddingBottom: width/4 }}/>
                          
                        :  <View style={{height: '80%', width:'100%', justifyContent:'center', alignItems:'center', paddingHorizontal:width/5}}>
                                <Image source={require('../../../assets/images/noChat.png')} style={{ resizeMode: 'contain' }} alt=''/>
                                <Text style={{fontSize:width/25, textAlign:"center", color: '#6A7187'}}>You have not chatted with anyone yet</Text>
                            </View>}

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
        height: hp('70%'),
        backgroundColor:"#fff",
        paddingHorizontal:width/20,
        paddingTop:width/20
    },
    text:{
        fontSize:width/20, 
        color:"#fff",
        marginHorizontal:width/20
    },
    chatBox:{
        backgroundColor:"#fff",
        width:"100%",
        height: hp('8%'),
        marginVertical:width/40,
        // paddingVertical:width/20,
        flexDirection:"row"
    },
    imgBox:{
        width:"15%",
        justifyContent:"center",
        alignItems:"center",
    },
    nameBox:{
        width:"60%",
        justifyContent:"center",
        paddingHorizontal:width/20
    },
    kmBox:{
        width:"25%",
        alignItems:"flex-end",
        justifyContent:"center",
    },
    imgBorder:{borderColor:"#423573", borderWidth:3},
    userName:{
        fontSize:width/25,
        color:"#000", fontWeight:"bold"
    },
    city:{
        fontSize:width/30,
        color:"#5B5B5B",
        paddingTop:width/50
    },
    kmText:{
        fontSize:width/28,
        color:"#1EAD13",
        fontWeight:"bold"
    },
    map:{
        fontSize:width/20,
        paddingTop:width/50,
        fontWeight:"bold",
        color:"#1EAD13"
    },   

});

export default Chats;