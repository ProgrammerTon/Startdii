import React, { createContext, useContext, useState, useEffect } from "react";
import colors from "../../constants/color";
import { useGlobalContext } from "../../context/GlobalProvider";

export const CharacterContext = createContext();
export const useCharContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [selectedChar, setSelectedChar] = useState("Char1");
  const [selectedColor, setSelectedColor] = useState(colors.green);
  const [selectedHat, setSelectedHat] = useState("HNone");
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
      setSelectedChar(user.character);
      setSelectedColor(user.characterColor);
      setSelectedHat(user?.characterHat ? user.characterHat : "HNone");
    }
  }, [user]);

  return (
    <CharacterContext.Provider
      value={{
        selectedChar,
        setSelectedChar,
        selectedColor,
        setSelectedColor,
        selectedHat,
        setSelectedHat,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
