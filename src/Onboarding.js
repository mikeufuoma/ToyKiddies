import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, ScrollView, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');


const slides = [
  {
    key: 1,
    title: 'TOYKIDDIE',
    text: 'Swap, Gift or Request toys easily.',
    image: require('../assets/images/onboard1.png'),
    color: "#FF5C8A"
  },
  {
    key: 2,
    title: 'TOYKIDDIE',
    text: 'Swap your old and unwanted  toys.',
    image: require('../assets/images/onboard2.png'),
    color: "#83C5BE"
  },
  {
    key: 3,
    title: 'TOYKIDDIE',
    text: 'Reduce waste and decluster.',
    image: require('../assets/images/onboard3.png'),
    color: "#E29578"
  },
  {
    key: 4,
    title: 'TOYKIDDIE',
    text: 'Spread the love of playtime!',
    image: require('../assets/images/onboard4.png'),
    color: "#80A1D4"
  },
  {
    key: 5,
    title: 'TOYKIDDIE',
    text: 'Join the ToyKiddie Community!',
    image: require('../assets/images/onboard5.png'),
    color: "#7B61FF"
  },
];


const Onboarding = () => {


  const navigation = useNavigation();
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [eventData, setEventData] = useState();

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;

    const { x } = event.nativeEvent.contentOffset;
    // console.log(x)
    const indexOfNextScreen = Math.floor(x / width);
    console.log(indexOfNextScreen)
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const nextSlide = (item) => {
    console.log(item.key)
    ref.scrollTo({ x: width * item.key })
  }
  const skipSlide = (item) => {
    ref.scrollTo({ x: width * 4 })
  }


  const [ref, setRef] = useState(null);

  useEffect(async() => {
      await AsyncStorage.setItem("hasSeenIntro", JSON.stringify(true));
  },[])





  const _renderItem = (item) => {
    return (
      <>

        <View key={item.key}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
          }}
          style={[styles.section, { backgroundColor: item.color}]}>

          <View style={styles.titleSection}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.imageSection}>
            <View style={[styles.design, styles.leftBackground]}>
            </View>
            <Image source={item.image} style={styles.img} />
            <View style={[styles.design, styles.rightBackground]}>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.headline}>{item.text}</Text>
          </View>

          <View style={styles.btnSection}>
            {sliderState.currentPage >= 3 ? <>

              <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={[styles.btnNext, { paddingHorizontal: width / 20, paddingVertical: width / 35, width: '100%' }]}>
                <Text style={{ color: '#423573', fontSize: width / 22 }}>Get Started</Text>
              </TouchableOpacity>

            </> : <>
              <TouchableOpacity onPress={() => skipSlide(item)} style={styles.btnSkip}>
                <Text style={{ color: '#fff', fontSize: width / 22 }}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => nextSlide(item)} style={styles.btnNext}>
                <Text style={{ color: '#423573', fontSize: width / 22 }}>Next</Text>
              </TouchableOpacity>
            </>}
          </View>

        </View>




      </>
    );
  }


  return (
    <>

      <View style={{ flex: 1, }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true} />

        <ScrollView
          ref={(ref) => {
            setRef(ref);
          }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            // console.log(event.target)
            setSliderPage(event);
          }}>
          {slides.map((item) => {
            return _renderItem(item);
          })}


        </ScrollView>


      </View>
    </>
  );
};


const styles = StyleSheet.create({
  body: {
    height: height,
    backgroundColor: '#FF5C8A'
  },
  section: {
    height: height,
    paddingTop: width / 5
  },
  titleSection: {
    alignItems: "center",
    width: width,
    paddingHorizontal: width / 20,
    paddingVertical: width / 20
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: width / 15,
    color: "#fff",
    fontWeight: "bold"
  },
  headline: {
    fontSize: width / 15,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  design: {
    width: width / 20,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    marginVertical: width / 5,
  },
  leftBackground: {
    borderTopRightRadius: width / 20,
    borderBottomRightRadius: width / 20
  },
  rightBackground: {
    borderTopLeftRadius: width / 20,
    borderBottomLeftRadius: width / 20
  },
  btnSection: {
    flexDirection: "row",
    width: width,
    paddingHorizontal: width / 10,
    justifyContent: "space-between"
  },
  btnSkip: {
    backgroundColor: 'transparent', justifyContent: 'center', borderColor: "#fff", borderWidth: 2, alignItems: 'center', marginTop: width / 20, paddingHorizontal: width / 20, paddingVertical: width / 45, borderRadius: width / 60, width: '48%'
  },
  btnNext: {
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: width / 20, paddingHorizontal: width / 20, paddingVertical: width / 45, borderRadius: width / 60, width: '48%'
  },
  img: {

  }

});


export default Onboarding;