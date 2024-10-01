import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const DescriptionBlock = ({ QuizDescription }) => {
  return (
    <View style={styles.descriptionBox}>
      <Text style={[fonts.EngRegular16, styles.descriptionText]}>{QuizDescription}</Text>
    </View>
  );
};

export default DescriptionBlock;

const styles = StyleSheet.create({
  descriptionBox: {
    marginTop: 5,
    borderRadius: 5,
  },
  descriptionText: {
    color: colors.black,
    textAlign: "justify",
  },
});
