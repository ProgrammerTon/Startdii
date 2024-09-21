import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import colors from "../../constants/color";
import fonts from "../../constants/font";

export default function FriendGuildMenu({ menuData, activeMenu, setActiveMenu }) {
  const [textWidth, setTextWidth] = useState({});

  const handleTextLayout = (index, event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth((prev) => ({ ...prev, [index]: width }));
  };

  return (
    <View style={styles.menuContainer}>
      {
        menuData.map((menu, index) => {
          let isActive = menu.name === activeMenu;
          let activeButtonClass = isActive ? [fonts.EngSemiBold16, styles.selected] : [fonts.EngSemiBold16, styles.notselected];
          let activeLineClass = isActive 
            ? { ...styles.lineSelected, width: textWidth[index] } 
            : styles.lineNotSelected;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveMenu(menu.name)}>
              <View style={styles.container}>
                <Text
                    style={activeButtonClass}
                    onLayout={(event) => handleTextLayout(index, event)}>
                    {menu.name}
                </Text>
                <View style={activeLineClass}></View>
              </View>
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: '10%',
  },
  container: {
      alignItems: 'center',
  },
  selected: {
      color: colors.red,
  },
  notselected: {
      color: colors.gray_font,
  },
  lineSelected: {
      height: 3,
      borderRadius: 50,
      backgroundColor: colors.red,
      marginTop: '8%',
  },
  lineNotSelected: {
      height: 3,
      borderRadius: 50,
      backgroundColor: colors.gray_bg,
      marginTop: '8%',
  },
});
