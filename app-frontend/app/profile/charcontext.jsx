import React, { createContext, useContext, useEffect, useState } from "react";
import colors from "../../constants/color";
import { useGlobalContext } from "../../context/GlobalProvider";

export const CharacterContext = createContext();
export const useCharContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedChar, setSelectedChar] = useState("Char1");
  const [selectedColor, setSelectedColor] = useState(colors.pink);
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
      setSelectedChar(user.character);
      setSelectedColor(user.characterColor);
    }
  }, [user]);

  return (
    <CharacterContext.Provider
      value={{ selectedChar, setSelectedChar, selectedColor, setSelectedColor }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
