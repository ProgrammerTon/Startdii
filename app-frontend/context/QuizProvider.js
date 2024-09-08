import React, { createContext, useContext, useEffect, useState } from "react";
import { guildDetail } from "../services/GuildService";
import { Alert } from "react-native";

const QuizContext = createContext();
export const useQuizContext = () => useContext(QuizContext);

const QuizProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  return (
    <QuizContext.Provider
      value={{ title, description, tags, setTitle, setDescription, setTags }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
