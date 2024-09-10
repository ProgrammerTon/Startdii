import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DescriptionBlock = ({ description }) => {
  return (
    <View style={styles.descriptionBox}>
      {description && <Text style={styles.descriptionText}>{description}</Text>}
    </View>
  );
};

export default DescriptionBlock;

const styles = StyleSheet.create({
  descriptionBox: {
    marginTop: 5,
    padding: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "justify",
  },
});
