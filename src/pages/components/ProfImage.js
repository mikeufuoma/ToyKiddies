import React, {useContext, useState, useEffect} from "react";
import {
  Dimensions,
} from "react-native";
import {Image} from "native-base";
var { width } = Dimensions.get("window");
import { Context } from '../../../Store';
import configData from "../../../Config.json";

const ProfImage = () => {
    const [state, setState] = useContext(Context);
    return (
        <>
            <Image size={width / 16} borderRadius={100} source={{
                        uri: `${configData.PIC_URL}/${state.profImage}`
                        }} alt="name" />
            
        </>
    );
};

export default ProfImage;