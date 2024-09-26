import React, { createContext, useContext, useState } from "react";
import colors from "../../constants/color";

export const CharacterContext = createContext();
export const useCharContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [selectedChar, setSelectedChar] = useState('Char1');
    const [selectedColor, setSelectedColor] = useState(colors.green);
    const [selectedHat, setSelectedHat] = useState('HNone');

    return (
        <CharacterContext.Provider value={{ selectedChar, setSelectedChar, selectedColor, setSelectedColor, selectedHat, setSelectedHat }}>
            {children}
        </CharacterContext.Provider>
    );
};
