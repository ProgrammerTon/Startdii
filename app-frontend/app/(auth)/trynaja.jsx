import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import AuthService from "../../services/AuthService";
import { router } from "expo-router";
import fonts from "../../constants/font";
import { Shadow } from "react-native-shadow-2";
import colors from "../../constants/color";
import Babypinksvg from "../../components/Babypinksvg";
import { getCurrentUser } from "../../utils/asyncstroage";
import { useGlobalContext } from "../../context/GlobalProvider";
import BackButton from "../../components/BackButton";



export default function Toptab() {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.toptab}> 
        <BackButton></BackButton>
      </View>
      <View style={styles.frame}></View>
      
    </SafeAreaView>
  )
}

const styles = {
  bg: {
    height: "100%",
    backgroundColor: colors.gray_bg,
  },
  toptab: {
    // display: 'inline-block',
    backgroundColor: colors.pink,
    textAlign: 'center',
    height : '10.625%'
  },
  frame: {
    margin: "3%",
    paddingHorizontal: "1%",
    paddingTop: "50%",
    paddingBottom: "20%",
    borderRadius: 10, // Equivalent to rounded-[10px]
    backgroundColor: colors.gray_bg,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "down",

    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
  
}

