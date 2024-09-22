import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#000", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconStyle:{
    alignSelf: "flex-start",
    marginRight: 8,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 8,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf:"center",
  },
});

export default FriendGuildList;
