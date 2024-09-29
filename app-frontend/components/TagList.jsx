import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../constants/color";
import fonts from "../constants/font";

export default function TagList({ tags=[], title, id }) {
  return (
    <View style={styles.container}>
      {tags?.map((tag, i) => {
        return (
          <View
            style={styles.tag}
            key={`${tag}-${id}-${i}`}
          >
            <Text style={[fonts.EngMedium12, styles.text]}>#{tag}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  tag: {
    height: 24,
    backgroundColor: colors.gray_button,
    borderRadius: 50,
    padding: 3,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.black,
  },
})
