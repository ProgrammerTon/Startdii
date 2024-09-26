import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import colors from '../constants/color';
import fonts from "../constants/font";

const RecheckBox = () => {
  const handleYesPress = () => {
    console.log("Yes clicked");
  };

  const handleNoPress = () => {
    console.log("No clicked");
  };
  return (
    <View style={styles.box}>
      <View style={styles.textcontainer}>
        <Text style={[fonts.EngBold16]}>Are you sure?</Text>
      </View>
      <TouchableOpacity style={styles.yesbox} onPress={handleYesPress}>
        <Text style={fonts.EngBold16}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nobox} onPress={handleNoPress}>
        <Text style={fonts.EngBold16}>No</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RecheckBox;

const styles = StyleSheet.create({
  box:{
    backgroundColor: colors.white,
    height: 110,
    width: 260,
    borderRadius: 10,
},
textcontainer:{
    alignItems: 'center',
    justifyContent: 'center',
    top:20,
},
yesbox:{
    backgroundColor: colors.red,
    height: 44,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top: 25, 
    left:130,
},
nobox:{
    backgroundColor: colors.gray_button,
    height: 44,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top:-19,
    left: 40
}

});
