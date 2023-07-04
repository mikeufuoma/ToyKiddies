
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
var { width } = Dimensions.get("window");

const Post = () => {
    return (
        <>


      <View
        style={{
          position: 'absolute',
          bottom: -width/40,
          height: width / 10,
          width: width / 10,
          borderRadius: 58,
          backgroundColor: '#FD6562',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon name={'pluscircleo'} size={width / 25} style={{ color: "#fff" }}/>  
      </View>

            
        </>
    );
};

export default Post;