import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Pressable } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
var { width } = Dimensions.get("window");

const Success = ({route}) => {
    const navigation = useNavigation();
    const { nav, msg } = route.params;


    return (
        <>
        <View style={[styles.body]}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6654A8" translucent={true} />

             <View style={[styles.main]}>
                <LinearGradient style={styles.main} colors={['#6654A8', '#423573']}>
                  

                <View style={{flex:1, paddingHorizontal:width/10, alignItems:"center", justifyContent: 'center'}}>
                    <Image source={require('../assets/images/successIcon.png')} style={{ resizeMode: 'contain', marginBottom:width/20, width:width/2  }} />  
                    <Text style={{fontSize:width/15, fontWeight:"bold", color:"#fff"}}>Congratulations!</Text>
                    <Text style={{fontSize:width/25, color:"#fff", textAlign:"center", marginTop:width/20 }}>{msg}</Text>
                 </View>

                <ImageBackground  source={require('../assets/images/effect.png')} style={{flex:1, justifyContent:"flex-end", paddingBottom:width/10, paddingHorizontal:width/10}}>

                    <Pressable  onPress={() => navigation.navigate(nav)} style={styles.loginBtn}>
                        <Text style={styles.btnText}>Continue</Text>
                    </Pressable>
                    
                </ImageBackground>




                </LinearGradient>
             </View>


          </View>
            
        </>
    );
};


const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: "#fff",
    },
    main:{
        flex:1,
        width:width
    },
    loginBtn: {
      backgroundColor:"#FD6562",
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
  
  });
  

export default Success;