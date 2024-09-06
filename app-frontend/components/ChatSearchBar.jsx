import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  
  const ChatSearchBar = ({ value, handleChangeText, onSubmit }) => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#c4c4c4"
          value={value}
          onSubmitEditing={onSubmit}
          onChangeText={handleChangeText}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      backgroundColor: "#f4ede4",
      borderRadius: 25,
      paddingHorizontal: '5%',
      paddingVertical: '3%',
      marginBottom: 15,
      marginTop: 15,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
  });
  
  export default ChatSearchBar;
  