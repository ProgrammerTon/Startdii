import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const ChoiceBoxes = ({
  count,
  textInputs,
  setTextInputs,
  activeButtons,
  setActiveButtons,
}) => {
  const toggleButtonColor = (index) => {
    const updatedButtons = activeButtons.includes(index)
      ? activeButtons.filter((item) => item !== index)
      : [...activeButtons, index];

    setActiveButtons(updatedButtons);
  };

  const handleTextChange = (index, text) => {
    const updatedTextInputs = { ...textInputs, [index]: text };
    setTextInputs(updatedTextInputs);
  };

  const renderChoiceBoxes = () => {
    let boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(
        <View key={i} style={styles.choiceRow}>
          <TextInput
            style={styles.choiceBox}
            placeholder={`Answer ${i + 1}`}
            value={textInputs[i] || ""}
            onChangeText={(text) => handleTextChange(i, text)}
          />
          <TouchableOpacity
            style={
              activeButtons.includes(i)
                ? styles.activeFilterButton
                : styles.inactiveFilterButton
            }
            onPress={() => toggleButtonColor(i)}
          >
            <Text style={[fonts.EngBold14, styles.toggleButtonText]}>
              {activeButtons.includes(i) ? "True" : "False"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return boxes;
  };

  return <View style={styles.choiceBoxContainer}>{renderChoiceBoxes()}</View>;
};

export default ChoiceBoxes;

const styles = StyleSheet.create({
  choiceBoxContainer: {
    marginVertical: 10,
    width: "100%",
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
    width: "100%",
  },
  choiceBox: {
    flex: 1,
    borderWidth: 1.75,
    borderColor: colors.gray_button,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  inactiveFilterButton: {
    backgroundColor: colors.gray_font,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: colors.white,
  },
});
