import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from "../../constants/color";

const { width, height } = Dimensions.get('window');

const FriendGuildList = ({ content, isSelected = false, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.textStyle}>{content.title}</Text>
        </View>
        {(isSelected)? <MaterialCommunityIcons name="radiobox-marked" size={24} color="black" style={styles.iconStyle}/>
         : <MaterialCommunityIcons name="radiobox-blank" size={24} color="black" style={styles.iconStyle}/>}
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconStyle:{
    alignSelf: "center",
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FriendGuildList;
