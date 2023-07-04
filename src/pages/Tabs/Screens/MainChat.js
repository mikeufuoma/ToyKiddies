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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import configData from "../../../../Config.json";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, Input, Image } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var width = Dimensions.get("window").width;

const chatD = [
    {content: 'Twin Brown tedy bear', id: 1},
    {content: 'Half dressed baby doll', id: 2},
    {content: 'Twin Brown tedy bear', id: 1},
    {content: 'Twin Brown tedy bear', id: 1},
    {content: 'Half dressed baby ', id: 2},
]
  


const MainChat = ({route}) => {

    const { data, user } = route.params;


    const [active, setActive] = useState("all");
    const navigation = useNavigation();


    const [chat, setChat] = useState([]);
    const [content, setContent] = useState('');


    const addCat = async(type) => {
        //   return setChat(chat => [...chat, {content: content, id:1}]);
        //     console.log("added")

    //    return console.log(JSON.stringify(data.acceptingUserId._id, null, 2));

     const token = await AsyncStorage.getItem('token');
     //  setIsLoading(true);
 
      return  fetch(`${configData.SERVER_URL}/chat/initial-chat/${user._id}`, {
       method: "post",
       headers: {
         Accept: "application/json",
         "content-type": "application/json",
         "x-auth-token": JSON.parse(token)
       }, 
       body:JSON.stringify({
            type:type,
            message:content
       }) 
         })
       .then((response) => response.json())
       .then((responseJson) => {
             console.log(responseJson)
             if(responseJson.status === "success"){
                setContent('');
                 getChat();
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
       })
    }

    const getChat = async() => {
    
        const token = await AsyncStorage.getItem('token');
        return fetch(`${configData.SERVER_URL}/chat/get-chat/${user._id}`, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "x-auth-token": JSON.parse(token)
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(JSON.stringify(responseJson.data, null, 2));
            if (responseJson.status === 'success') {
                setChat(responseJson.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    
    }
    useEffect(() => {
        const interval=setInterval(()=>{
            getChat();
        },3000)
        
        return()=>clearInterval(interval)
    },[])


  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }


     const renderItem = ({ item }) => (
       
        <View style={(item.user !== user._id) ? styles.chatBox : styles.chatBoxTwo}>
            <LinearGradient style={(item.user !== user._id) ? styles.textBox : styles.textBoxTwo} colors={(item.user !== user._id) ? ['#6654A8', '#423573'] : ['#F7F9FC', '#F7F9FC']}>
                <Text style={(item.user !== user._id) ? styles.text : styles.textTwo}>{item.message}</Text>
                <Text style={styles.icon}></Text>
            </LinearGradient>
        </View>
    
        );
    
    


    return (
        <>
        <View style={[styles.body]}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" />
            <View style={styles.main}>

                <View style={styles.boxOne}>
                   <LinearGradient style={[styles.boxOne, {paddingHorizontal:width/20, justifyContent:"flex-end", alignItems:"flex-start"}]} colors={['#6654A8', '#423573']}>
                        <TouchableOpacity onPress={handleBackButtonClick} style={{ marginBottom: width / 20 }}>
                            <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#fff" }} />
                        </TouchableOpacity>
                        <View style={{paddingBottom:wp("5%"), flexDirection: 'row'}}>
                            <Image size={width / 8} borderRadius={100} 
                               source={{uri:`${configData.PIC_URL}/${user.profImage}`}} alt="profile" style={styles.imgBorder}/>
                          <View style={{marginLeft:width/40}}>
                           <Text style={[styles.text, {fontWeight:"500", fontSize:wp('5%')}]}>{user.firstName}</Text>
                           <Text style={[styles.text, {fontSize:wp('4%')}]}>Online</Text>
                          </View>
                        </View>


                    </LinearGradient>
                </View>
            

       <KeyboardAwareScrollView extraHeight={8}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={[styles.scroll]} enableOnAndroid>
                <View style={styles.boxTwo}>


            {chat && chat.length > 0
                        ? 
                        <FlatList
                              data={chat}
                              renderItem={renderItem}
                              inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} 
                              keyExtractor={item => item._id}/>
                          
                        :  <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:width/25, marginTop:width/2, fontSize:width/20, fontWeight:'bold'}}>No chat yet</Text>
                            </View>}



                    <View style={styles.msgBox}>
                        <TouchableOpacity style={{width:wp('10%')}}>
                             <MaterialIcons name={'camera'} size={width / 15} style={styles.camera}/>
                        </TouchableOpacity> 
                         <View style={{width:wp('70%')}}>
                            <Input w={{base: "98%"}}  size="lg" backgroundColor={"#ECF0F0"} borderRadius={width/10}
                                style={{ height: width/9,backgroundColor:"#ECF0F0"}}
                                _focus={{ borderColor: '#ECF0F0', color:"#000",  borderWidth: 1.5, backgroundColor:"#ECF0F0"}}
                                value={content} onChangeText={text => setContent(text)}

                                // InputLeftElement={<Icon as={<MaterialIcons name="mic" />} size={6} ml="4" color="#6654A8" />} placeholder="Start typing..." 
                                />
                         </View>
                        <TouchableOpacity onPress={()=> addCat("text")} style={{width:wp('10%')}}>
                             <Ionicons name={'send'} size={width / 15} style={styles.send} />
                        </TouchableOpacity>

                    </View>
                


                </View>
        </KeyboardAwareScrollView>

            </View>

      </View>       
            
        </>
    );
};


const styles = StyleSheet.create({
    body: {
      flex: 1
    },
    main:{
       height: hp('100%'),
       backgroundColor: "#fff",
    },
    boxOne:{
        height: hp('20%')
    },
    scroll:{
        height: hp('80%'),
      },
    boxTwo:{
        height: hp('80%'),
        paddingHorizontal:width/20,
        paddingTop:width/20,
        paddingBottom:width/4
    },
    chatBox:{
        width:"100%",
        height: "auto",
        marginVertical:width/40,
        alignItems:"flex-end",
    },
    textBox:{
        width:"80%",
        height: "auto",
        paddingVertical:wp('4%'),
        paddingHorizontal:wp('3%'),
        flexDirection:"row",
        borderTopLeftRadius:width/40,  
        borderTopRightRadius:width/40,
        borderBottomLeftRadius:width/40,
    },  
    text:{
        fontSize:width/25, 
        color:"#fff",
    },
    chatBoxTwo:{
        width:"100%",
        height: "auto",
        marginVertical:width/40,
        alignItems:"flex-start"
    },
    textBoxTwo:{
        width:"80%",
        height: "auto",
        paddingVertical:wp('4%'),
        paddingHorizontal:wp('3%'),
        flexDirection:"row",
        borderTopLeftRadius:width/40,  
        borderTopRightRadius:width/40,
        borderBottomRightRadius:width/40 
    }, 
    textTwo:{
        fontSize:width/25, 
        color:"#000"
    },
    camera:{
        color:"#83899B",
        fontSize:wp('7%')
    },
    send:{
        color:"#6654A8",
        fontSize:wp('7%')
    },
    msgBox:{
        backgroundColor:"#fff",
        width:width, 
        height:hp("12%"), 
        paddingHorizontal:width/20, 
        paddingBottom:wp('2%'), justifyContent:'space-between', alignItems:'center', position: 'absolute', bottom:'0%', flexDirection:"row" 
    }

});

export default MainChat;