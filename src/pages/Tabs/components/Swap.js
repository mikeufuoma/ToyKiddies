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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import configData from "../../../../Config.json";


var width = Dimensions.get("window").width;

  

const Swap = () => {
    const navigation = useNavigation();    const [toys, setToys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
         getToys();
    },[])

   
    const getToys = async() => {
        setIsLoading(true);
         
    const token = await AsyncStorage.getItem('token');
    return fetch(`${configData.SERVER_URL}/toy/mySwapToys`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": JSON.parse(token)
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 'success') {
          setToys(responseJson.data);
          setIsLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });


     }



    
      const renderItem = ({ item }) => (

        <View style={styles.toyBox}>
           <View style={styles.boxTop}>
                <TouchableOpacity style={styles.userBox}>
                    <Image size={width / 16} borderRadius={100}  source={{
                        uri: `${configData.PIC_URL}/${item.owner.profImage}`
                        }}  alt="profile"/>
                    <Text style={styles.userName}>{item.owner.firstName}</Text>
                </TouchableOpacity>
                <View>
                   <Icon name={'checkbox-blank-circle-outline'} size={width / 12} style={{ color: "#83899B" }} />
                </View>
           </View>

            <TouchableOpacity onPress={() => navigation.navigate('ToyDetails', {
                        data: item,
                        owner:"yes"
                    })} style={styles.middleBox}>
                 <Image source={{uri:`${configData.PIC_URL}/${item.imageOne}`}}  style={{ resizeMode: 'contain', width:"100%", height:"100%" }}  alt="Toy image" />
                <Text style={styles.toyName}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    
        );
    
     

    return (
        <>


<View style={styles.boxTwo}>

  {/* <Text style={{fontSize:width/25, marginTop:width/40, color:"#000", textAlign: "center"}}>Swapped toys</Text> */}

{toys && toys.length > 0
        ? <>
        <FlatList
              data={toys}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              contentContainerStyle={{ paddingBottom: width/1.2 }}/>

        
          
       </> :  <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:width/25, marginTop:width/2, fontSize:width/20, fontWeight:'bold'}}>No Toy Found</Text>
            </View>}

</View>

            
        </>
    );
};




const styles = StyleSheet.create({
    boxTwo:{
        height: hp('80%'),
        paddingHorizontal:width/20,
    },  
    text:{
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
        height: hp('40%'),
        marginTop:width/20,
        padding:width/40
    },
    boxTop:{
        flexDirection:"row", 
        justifyContent: "space-between",
        height:"15%"
    },
    middleBox:{
        height:"75%"
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


export default Swap;