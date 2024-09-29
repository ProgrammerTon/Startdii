import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import QuestionTemplate from "./QuestionTemplate";

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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: "#fff",
  },
});
