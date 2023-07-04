import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get("window");


const slides = [
    {
      key: 1,
      title: 'TOYKIDDIE',
      text: 'Swap, Gift or Request toys easily.',
      image: require('../assets/images/onboard1.png'),
      color:"#FF5C8A"
    },
    {
      key: 2,
      title: 'TOYKIDDIE',
      text: 'Swap your old and unwanted  toys.',
      image: require('../assets/images/onboard1.png'),
      color:"#83C5BE"
    },
    {
      key: 3,
      title: 'TOYKIDDIE',
      text: 'Reduce waste and decluster.',
      image: require('../assets/images/onboard1.png'),
      color:"#E29578"
    },
    {
      key: 4,
      title: 'TOYKIDDIE',
      text: 'Spread the love of playtime!',
      image: require('../assets/images/onboard1.png'),
      color:"#80A1D4"
    },
    {
      key: 5,
      title: 'TOYKIDDIE',
      text: 'Join the ToyKiddie Community!',
      image: require('../assets/images/onboard1.png'),
      color:"#7B61FF"
    },
  ];
  

const IntroScreen = () => {
    const navigation = useNavigation();


 const _renderItem = ({item}) => {
    return (
      <>
        
        <View style={{flex: 1}}>
  
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}/>
        <View style={styles.body}> 

            <View style={styles.titleSection}>
                <Text style={styles.title}>{item.title}</Text>
            </View> 
            <View style={styles.imageSection}>
                 <View style={[styles.design, styles.leftBackground]}>
                 </View>
                 <Image source={item.image} style={styles.img}/>
                 <View style={[styles.design, styles.rightBackground]}>
                 </View>
            </View>
            <View style={styles.titleSection}>
               <Text style={styles.headline}>{item.text}</Text>
            </View>

            {/* <View style={styles.btnSection}>
                 
                     <TouchableOpacity style={styles.btnSkip}>
                              <Text  style={{color:'#fff', fontSize:width/25}}>Skip</Text>
                          </TouchableOpacity>

                     <TouchableOpacity style={styles.btnNext}>
                              <Text  style={{color:'#000', fontSize:width/25}}>Next</Text>
                          </TouchableOpacity>
            </View> */}

        </View>

    </View>




      </>
    );
  }
  const _renderNextButton = () => {
    return (
        <View style={styles.btnNext}>
                 <Text  style={{color:'#000', fontSize:width/25}}>Next</Text>
             </View>
    );
  };
  const _renderDoneButton = () => {
    return (

        <View style={[styles.btnNext, {width:"80%"}]}>
            <Text  style={{color:'#000', fontSize:width/25}}>Get Started</Text>
        </View>

    //   <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.buttonCircle}>
    //     <Text style={styles.buttonText}>Done</Text>
    //   </TouchableOpacity>
    );
  };
  const _renderSkipButton = () => {
    return (
        <View style={styles.btnSkip}>
                 <Text  style={{color:'#fff', fontSize:width/25}}>Skip</Text>
             </View>
    );
  };


    // useEffect(() => {
    //     console.log("we are here")
    // },[])

    return (<>


      <AppIntroSlider
        // keyExtractor={(item, index) => index.toString()}
        showSkipButton={true}
        renderItem={_renderItem}
        data={slides}
        // onSkip={() => console.log("on Skip")}
        onDone={() => navi("on Done")}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        bottomButton
        />


   </> );
};


const styles = StyleSheet.create({
    body: {
      height: '100%',
      backgroundColor: '#FF5C8A',
      paddingTop: width/5
    //   justifyContent:"center"
      // paddingHorizontal:width/35,
    },
    titleSection:{
        alignItems:"center",
        width:width,
        paddingHorizontal:width/20,
        paddingVertical:width/20
    },
    imageSection:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
       fontSize:width/15,
       color:"#fff",
       fontWeight:"bold"
    },
    headline:{
       fontSize:width/15,
       color:"#fff",
       fontWeight:"bold",
       textAlign:"center"
    },
    design:{
        width:width/20,
        backgroundColor:"#FFFFFF",
        opacity:0.3,
        marginVertical:width/5,
    },
    leftBackground:{
        borderTopRightRadius:width/20,
        borderBottomRightRadius:width/20
    },
    rightBackground:{
        borderTopLeftRadius:width/20,
        borderBottomLeftRadius:width/20
    },
    btnSection:{
       flexDirection:"row",
       width:width,
       paddingHorizontal:width/10,
       justifyContent:"space-between"
    },
    btnSkip:{
        backgroundColor:'transparent', justifyContent:'center', borderColor:"#fff", borderWidth:2, alignItems:'center',  marginTop:width/20, paddingHorizontal:width/20, paddingVertical:width/45, borderRadius:width/60, width:'48%'
    },
    btnNext:{
        backgroundColor:'#fff', justifyContent:'center', alignItems:'center',  marginTop:width/20, paddingHorizontal:width/20, paddingVertical:width/45, borderRadius:width/60, width:'48%'
    }

});

export default IntroScreen;