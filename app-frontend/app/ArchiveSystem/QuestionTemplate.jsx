import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import ChoiceBoxes from "./ChoiceBoxes";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const QuestionTemplate = ({ question, setQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(
    question.templateData?.selectedOption || "fill"
  );
  const [choices, setChoices] = useState(question.templateData?.choices || 2);
  const [value, setValue] = useState(question.templateData?.value || "");
  const [textInputs, setTextInputs] = useState(
    question.templateData?.textInputs || {}
  );
  const [activeButtons, setActiveButtons] = useState(
    question.templateData?.activeButtons || [0]
  );

  useEffect(() => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === question.id
          ? {
              ...q,
              templateData: {
                ...q.templateData,
                selectedOption,
                choices,
                value,
                textInputs,
                activeButtons,
              },
            }
          : q
      )
    );
  }, [selectedOption, choices, value, textInputs, activeButtons]);

  const handleChoiceChange = (type) => {
    if (choices == 2) {
      const newChoices = type === "increase" ? choices + 1 : choices;
      setChoices(newChoices);
    } else if (choices == 6) {
      const newChoices = type === "increase" ? choices : choices - 1;
      setChoices(newChoices);
    } else if (choices >= 3 && choices <= 5) {
      const newChoices = type === "increase" ? choices + 1 : choices - 1;
      setChoices(newChoices);
    }
  };

  const handleChange = (text) => {
    const numericValue = text;
    setValue(numericValue);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.optionContainer}
        onPress={() => setSelectedOption("fill")}
      >
        <View
          style={[
            styles.radioButton,
            selectedOption === "fill" && styles.selectedRadio,
          ]}
        />
        <Text style={[fonts.EngMedium16, styles.optionText]}>Fill the answer</Text>
        {selectedOption === "fill" && (
          <TextInput
            style={styles.answerInput}
            placeholder="Answer"
            keyboardType="numeric"
            value={value}
            onChangeText={handleChange}
          />
        )}
      </Pressable>

      <Pressable
        style={styles.optionContainer}
        onPress={() => setSelectedOption("choice")}
      >
        <View
          style={[
            styles.radioButton,
            selectedOption === "choice" && styles.selectedRadio,
          ]}
        />
        <Text style={[fonts.EngMedium16, styles.optionText]}>Choice</Text>

        {selectedOption === "choice" && (
          <View style={styles.choiceContainer}>
            <TouchableOpacity onPress={() => handleChoiceChange("decrease")}>
              <Text style={[fonts.EngBold18, styles.choiceButton]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.choiceNumber}>{choices}</Text>
            <TouchableOpacity onPress={() => handleChoiceChange("increase")}>
              <Text style={[fonts.EngBold18, styles.choiceButton]}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>

      {selectedOption === "choice" && (
        <ChoiceBoxes
          count={choices}
          textInputs={textInputs}
          setTextInputs={setTextInputs}
          activeButtons={activeButtons}
          setActiveButtons={setActiveButtons}
        />
      )}
    </View>
  );
};

export default QuestionTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: colors.red,
  },
  optionText: {
    color: colors.black,
  },
  answerInput: {
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    flex: 1,
  },
  choiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  choiceButton: {
    fontSize: 20,
    color: colors.blue,
    paddingHorizontal: 10,
  },
  choiceNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
