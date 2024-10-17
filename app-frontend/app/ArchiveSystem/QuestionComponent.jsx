import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import QuestionTemplate from "./QuestionTemplate";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const QuestionComponent = ({ questionNumber, question, setQuestions }) => {
  const [questionText, setQuestionText] = useState(
    question.templateData?.questionText || ""
  );

  const handleQuestionChange = (text) => {
    setQuestionText(text);
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === question.id
          ? { ...q, templateData: { ...q.templateData, questionText: text } }
          : q
      )
    );
    //console.log(`Question ${questionNumber}:`, text);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={questionText}
        onChangeText={handleQuestionChange}
        placeholder="Question"
      />
      <QuestionTemplate question={question} setQuestions={setQuestions} />
    </View>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  input: {
    height: 120,
    width: "100%",
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: colors.white,
  },
});
