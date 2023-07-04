import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Image, } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfile from './components/EditProfile';
import MyToys from './components/MyToys';
import Gave from './components/Gave';
import Swap from './components/Swap';
import Chats from './components/SubChats';
import Request from './components/Request';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Context } from '../../../Store';
import configData from "../../../Config.json";

var { width } = Dimensions.get("window");
const Profile = () => {
    const [active, setActive] = useState("toys");
    const [state, setState] = useContext(Context);
    const navigation = useNavigation();

    const logout = () => {
        AsyncStorage.clear();
        navigation.dispatch(
                StackActions.replace('Signin', {})
              );
    }

    return (
        <>
        <SafeAreaView style={[styles.body]}>
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />
  
  
          <View style={[styles.body]} enableOnAndroid>
  
            <View style={[styles.main]}>
  
  
              <View style={[styles.top]}>
                <TouchableOpacity>
                  <Ionicons name={'arrow-back-sharp'} size={width / 15} style={{ color: "#061237" }} />
                </TouchableOpacity>
                <Text style={{ color:"#061237", fontSize:width/20, fontWeight:"bold" }}>Personal Details</Text>
                <TouchableOpacity>
                  {/* <Feather  onPress={()=> setActive('edit')} name={'edit'} size={width / 20} style={{ color: "#423573" }} /> */}
                </TouchableOpacity>
              </View>

              <View style={styles.profBox}>
                 
                <View style={styles.imgSec}>
                    <Image size={width / 4} borderRadius={100} 
                         source={{
                          uri: `${configData.PIC_URL}/${state.profImage}`
                          }} alt="profile" style={{marginBottom:width/80}}/>
                     <Text style={{fontSize:width/25, color: "#000"}}>{state.firstName} {state.lastName}</Text>
                  <TouchableOpacity onPress={logout}>
                     <Text style={{fontSize:width/30, color: "#4A5CD0"}}>Log Out</Text>
                  </TouchableOpacity>
                </View>
                 <LinearGradient colors={['#6654A8', '#423573']} style={styles.detailSec}>
                    <View>
                        <Text style={{ color: "#fff", fontSize:width/25}}>Rated</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Ionicons name={'star'} size={width / 25} style={{ color: "#FD6562" }} />
                          <Text style={styles.iconText}>0</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity  onPress={()=> setActive('gave')}>
                        <Text style={{ color: "#fff", fontSize:width/25}}>Gave</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Ionicons name={'gift'} size={width / 25} style={{ color: "#FD6562" }} />
                          <Text style={styles.iconText}>0</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> setActive('swap')}>
                        <Text style={{ color: "#fff", fontSize:width/25}}>Swap</Text>
                        <View style={{flexDirection: 'row'}}>
                        <Ionicons name={'star'} size={width / 25} style={{ color: "#FD6562" }} />
                          <Text style={styles.iconText}>0</Text>
                        </View>
                    </TouchableOpacity>
                 </LinearGradient>

              </View>
              <View style={styles.contentBox}>
                 <View style={styles.tabNav}>
                       <TouchableOpacity onPress={()=> setActive('toys')}>
                           <Text style={styles.navText}>My Toys</Text>
                           <View style={(active === 'toys') ? {borderBottomWidth: 2, borderColor:"#FD6562", width: wp("15%"), marginTop:width/80} : null} ></View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=> setActive('request')}>
                           <Text style={styles.navText}>Request</Text>
                           <View style={(active === 'request') ? {borderBottomWidth: 2, borderColor:"#FD6562", width: wp("15%"), marginTop:width/80} : null} ></View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=> setActive('Chats')}>
                           <Text style={styles.navText}>Chats</Text>
                           <View style={(active === 'Chats') ? {borderBottomWidth: 2, borderColor:"#FD6562", width: wp("14%"), marginTop:width/80} : null} ></View>
                       </TouchableOpacity>
                    </View>

                    <View style={styles.content}>

                        {(active === "edit") ? <EditProfile/> : null}

                        {(active === "gave") ? <Gave/> : null} 

                        {(active === "swap") ? <Swap/> : null}

                        {(active === "Chats") ?<Chats/> : null}

                        {(active === "toys") ? <MyToys/> : null}

                        {(active === "request") ? <Request/> : null}
                       
                    </View>



                   
              </View>

              </View>

           </View>
        </SafeAreaView>
            
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
         paddingHorizontal:width/20,
      },
      top:{
        height:hp('5%'),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      },
      profBox:{
        height:hp('30%'),
        justifyContent:"flex-start",
        alignItems:"center",
        paddingTop:width/20
      },
      contentBox:{
        height:hp('65%')
      },
      imgSec:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
      },
      detailSec:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%",
        paddingVertical:width/20,
        paddingHorizontal:width/20,
        position:"absolute",
        bottom:0,
        borderRadius:width/40
      },
      iconText:{
        fontWeight:"bold", 
        marginLeft:width/80, 
        color: "#fff", 
        fontSize:width/25
       },
      tabNav:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:width/20,
        paddingTop:width/40
      },
      navText:{
        color: "#6654A8",
        fontSize:width/25
      },
      content:{
        height:"auto",
        paddingBottom:width/5
      }


});

export default Profile;