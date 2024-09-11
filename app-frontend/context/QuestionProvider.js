import React, { createContext, useContext, useEffect, useState } from "react";
import { guildDetail } from "../services/GuildService";
import { Alert } from "react-native";

const QuestionContext = createContext();
export const useQuestionContext = () => useContext(QuestionContext);

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
