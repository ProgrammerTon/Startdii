import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ArchiveSearchBar = ({ value, handleChangeText, onSubmit }) => {
  return (
    <View style={styles.wrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex : 1,
  },
  searchContainer: {
    width: '100%', 
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default ArchiveSearchBar;
