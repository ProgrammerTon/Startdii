import React, { createContext, useContext, useState } from "react";
import colors from "../../constants/color";

export const CharacterContext = createContext();
export const useCharContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, setSelectedChar] = useState('Char1');
    const [selectedColor, setSelectedColor] = useState(colors.pink);

    return (
        <CharacterContext.Provider value={{ selectedChar, setSelectedChar, selectedColor, setSelectedColor }}>
            {children}
        </CharacterContext.Provider>
    );
};
