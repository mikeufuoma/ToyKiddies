import React, {useState} from 'react';
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
import {Icon, Input, Image } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

var width = Dimensions.get("window").width;

const Product = () => {


    const navigation = useNavigation();


    const getToys = (data) => {
        setActive(data)
     }


const renderItem = ({ item }) => (

    <View style={styles.toyBox}>
       <View style={styles.boxTop}>
        <TouchableOpacity style={styles.userBox}>
            <Image size={width / 16} borderRadius={100} source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="profile" />
            <Text style={styles.userName}>Kate</Text>
        </TouchableOpacity>
        <View>
            <Text style={styles.toyStatus}>New</Text>
        </View>
       
       </View>
        <TouchableOpacity onPress={() => navigation.navigate("ToyDetails")} style={styles.middleBox}>
            <Image source={require('../../../assets/images/toy1.png')} style={{ resizeMode: 'contain', width:"100%", height:"100%" }}  alt="Toy image"  />
        </TouchableOpacity>
        <View style={styles.bottomBox}>
            <Text style={styles.toyName}>{item.name}</Text>
            
            <View style={styles.actions}>

            <TouchableOpacity onPress={() => alert('share')}>
            <MaterialIcons name={'share-2'} size={width / 15} style={{ color: "#BDBDBD" }} />
            </TouchableOpacity>

                <TouchableOpacity onPress={() => alert('login')}>
                    <LinearGradient style={styles.btn} colors={['#6654A8', '#423573']}>
                        <Text style={styles.btnText}>Get</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => alert('like')}>
                <MaterialIcons name={'heart'} size={width / 15} style={{ color: "#BDBDBD" }} />
                </TouchableOpacity>

            </View>

        </View>
    </View>

    );




    return (
        <>


{toys && toys.length > 0
                        ? 
                        <FlatList
                              data={toys}
                              renderItem={renderItem}
                              keyExtractor={item => item._id}/>
                     
                          
                        :  <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:width/25, marginTop:width/2, fontSize:width/20, fontWeight:'bold'}}>No Toy Found</Text>
                            </View>}
            
        </>
    );
};

const styles = StyleSheet.create({
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
        height:"10%"
    },
    middleBox:{
        height:"65%"
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
        borderRadius:width/20,
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

});

export default Product;