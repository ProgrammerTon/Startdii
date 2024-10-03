import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import BackButton from "../../components/BackButton";
import Char1 from "../../components/charactor/Charactor01";
import Char2 from "../../components/charactor/Charactor02";
import Char3 from "../../components/charactor/Charactor03";
import Char4 from "../../components/charactor/Charactor04";
import Char5 from "../../components/charactor/Charactor05";
import Char6 from "../../components/charactor/Charactor06";
import HNone from "../../components/hat/hat_none";
import HBanana from "../../components/hat/hat_banana";
import HCap from "../../components/hat/hat_cap";
import HCowboy from "../../components/hat/hat_cowboy";
import HCrown from "../../components/hat/hat_crown";
import HDeer from "../../components/hat/hat_deer";
import HFlower from "../../components/hat/hat_flower";
import HMagic from "../../components/hat/hat_magic";
import HPlant from "../../components/hat/hat_plant";
import HPlaster from "../../components/hat/hat_plaster";
import HShark from "../../components/hat/hat_shark";
import HXmas from "../../components/hat/hat_xmas";
import HAfro from "../../components/hat/hat_afro";
import HJuaz from "../../components/hat/hat_juaz";
import { useGlobalContext } from "../../context/GlobalProvider";
import { updateCostume } from "../../services/UserService";

import { CharacterContext } from "../profile/charcontext";
import { getUserLevel } from "../../services/LevelService";

const Tab = createMaterialTopTabNavigator();

function ShapeDetails({ onCharSelect, color }) {
  const { selectedChar, setSelectedChar } = useContext(CharacterContext);
  const handleColorSelect = (char) => {
    setSelectedChar(char);
    onCharSelect(char);
  };
  const isSelected = (char) => selectedChar === char;
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={styles.rowcontainer}>
          <View style={isSelected('Char1') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char1")}
            >
              <Char1 color={color} />
            </TouchableOpacity>
          </View>
          <View style={isSelected('Char2') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char2")}
            >
              <Char2 color={color} />
            </TouchableOpacity>
          </View>
          <View style={isSelected('Char3') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char3")}
            >
              <Char3 color={color} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowcontainer}>
          <View style={isSelected('Char4') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char4")}
            >
              <Char4 color={color} />
            </TouchableOpacity>
          </View>
          <View style={isSelected('Char5') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char5")}
            >
              <Char5 color={color} />
            </TouchableOpacity>
          </View>
          <View style={isSelected('Char6') ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleColorSelect("Char6")}
            >
              <Char6 color={color} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ColourDetails({ onColorSelect }) {
  const { selectedColor, setSelectedColor } = useContext(CharacterContext);
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };
  const isSelected = (color) => selectedColor === color;
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={styles.rowcontainer}>
          <View style={isSelected(colors.green) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.green)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.green }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={isSelected(colors.blue) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.blue)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.blue }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={isSelected(colors.red) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.red)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.red }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.rowcontainer}>
          <View style={isSelected(colors.pink) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.pink)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.pink }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={isSelected(colors.yellow) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.yellow)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.yellow }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={isSelected(colors.purple) ? styles.selected : styles.unselected}>
            <View style={styles.eachcontainer}>
              <TouchableOpacity onPress={() => handleColorSelect(colors.purple)}>
                <View
                  style={[styles.colorbutton, { backgroundColor: colors.purple }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HatDetails({ onHatSelect, level }) {
  const { selectedHat, setSelectedHat } = useContext(CharacterContext);
  const handleHatSelect = (hat, requiredLevel) => {
    if (level >= requiredLevel) {
      setSelectedHat(hat);
      onHatSelect(hat);
    }
  };
  const isSelected = (hat) => selectedHat === hat;
  const isUnlocked = (requiredLevel) => level >= requiredLevel;
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={styles.rowcontainer}>
          <View style={isSelected("HNone") ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HNone", 0)}
            >
              <HNone />
            </TouchableOpacity>
          </View>
          <View style={isSelected("HBanana") ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HBanana", 0)}
            >
              <HBanana />
            </TouchableOpacity>
          </View>
          <View style={isSelected("HCap") ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HCap", 0)}
            >
              <HCap />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowcontainer}>
          <View style={isSelected("HCowboy") ? styles.selected : styles.unselected}>
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HCowboy", 0)}
            >
              <HCowboy />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HCrown") ? styles.selected : styles.unselected, isUnlocked(5) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 5 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HCrown", 5)}
              disabled={!isUnlocked(5)}
            >
              <HCrown />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HDeer") ? styles.selected : styles.unselected, isUnlocked(10) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 10 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HDeer", 10)}
              disabled={!isUnlocked(10)}
            >
              <HDeer />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowcontainer}>
          <View style={[isSelected("HFlower") ? styles.selected : styles.unselected, isUnlocked(15) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 15 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HFlower", 15)}
              disabled={!isUnlocked(15)}
            >
              <HFlower />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HMagic") ? styles.selected : styles.unselected, isUnlocked(20) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 20 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HMagic", 20)}
              disabled={!isUnlocked(20)}
            >
              <HMagic />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HPlant") ? styles.selected : styles.unselected, isUnlocked(25) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 25 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HPlant", 25)}
              disabled={!isUnlocked(25)}
            >
              <HPlant />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowcontainer}>
          <View style={[isSelected("HPlaster") ? styles.selected : styles.unselected, isUnlocked(30) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 30 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HPlaster", 30)}
              disabled={!isUnlocked(30)}
            >
              <HPlaster />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HShark") ? styles.selected : styles.unselected, isUnlocked(35) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 35 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HShark", 35)}
              disabled={!isUnlocked(35)}
            >
              <HShark />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HXmas") ? styles.selected : styles.unselected, isUnlocked(40) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 40 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HXmas", 40)}
              disabled={!isUnlocked(40)}
            >
              <HXmas />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowcontainer}>
          <View style={[isSelected("HAfro") ? styles.selected : styles.unselected, isUnlocked(45) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 45 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HAfro", 45)}
              disabled={!isUnlocked(45)}
            >
              <HAfro />
            </TouchableOpacity>
          </View>
          <View style={[isSelected("HJuaz") ? styles.selected : styles.unselected, isUnlocked(50) ? styles.unlocked : styles.locked]}>
            {!isUnlocked(5) && (
              <View style={styles.lockTextContainer}>
                <Text style={[fonts.EngSemiBold14, styles.lockText]}>Level 50 to unlock</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.eachcontainer}
              onPress={() => handleHatSelect("HJuaz", 50)}
              disabled={!isUnlocked(50)}
            >
              <HJuaz />
            </TouchableOpacity>
          </View>
          <View
            style={styles.unselected}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default function DressTest() {
  // const [selectedChar, setSelectedChar] = useState(<Char1 style={styles.char} />);
  // const [selectedColor, setSelectedColor] = useState(colors.green);
  // const [selectedHat, setSelectedHat] = useState('HNone');
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    if (user) {
      loadUserLevel(user?._id);
    }
  }, [user]);

  const loadUserLevel = async () => {
    const user_lvl = await getUserLevel(user?._id);
    setUserLevel(user_lvl);
  };

  const {
    selectedChar,
    setSelectedChar,
    selectedColor,
    setSelectedColor,
    selectedHat,
    setSelectedHat,
  } = useContext(CharacterContext);
  const { user } = useGlobalContext();

  const handleUpdateChar = async (char) => {
    setSelectedChar(char);
    await updateCostume(user._id, char, selectedColor, selectedHat);
    console.log(user._id, char, selectedColor, selectedHat);
  };

  const handleUpdateColor = async (color) => {
    setSelectedColor(color);
    await updateCostume(user._id, selectedChar, color, selectedHat);
    console.log(user._id, selectedChar, color, selectedHat);
  };

  const handleUpdateHat = async (hat) => {
    setSelectedHat(hat);
    await updateCostume(user._id, selectedChar, selectedColor, hat);
    console.log(user._id, selectedChar, selectedColor, hat);
  };

  const getCharacterComponent = (char) => {
    switch (char) {
      case "Char1":
        return <Char1 color={selectedColor} />;
      case "Char2":
        return <Char2 color={selectedColor} />;
      case "Char3":
        return <Char3 color={selectedColor} />;
      case "Char4":
        return <Char4 color={selectedColor} />;
      case "Char5":
        return <Char5 color={selectedColor} />;
      case "Char6":
        return <Char6 color={selectedColor} />;
      default:
        return <Char1 color={selectedColor} />;
    }
  };

  const getHatComponent = (hat) => {
    switch (hat) {
      case "HBanana":
        return <HBanana />;
      case "HCap":
        return <HCap />;
      case "HCowboy":
        return <HCowboy />;
      case "HCrown":
        return <HCrown />;
      case "HDeer":
        return <HDeer />;
      case "HFlower":
        return <HFlower />;
      case "HMagic":
        return <HMagic />;
      case "HPlant":
        return <HPlant />;
      case "HPlaster":
        return <HPlaster />;
      case "HShark":
        return <HShark />;
      case "HXmas":
        return <HXmas />;
      case "HAfro":
        return <HAfro />;
      case "HJuaz":
        return <HJuaz />;
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.toptab}>
        <BackButton></BackButton>
        <Text style={[fonts.EngBold22, styles.headerText]}>Dressing Room</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.characterContainer}>
          {/* Render Hat and Character Together */}
          {getCharacterComponent(selectedChar)}
          {getHatComponent(selectedHat) && (
            <View style={styles.hatContainer}>
              {getHatComponent(selectedHat)}
            </View>
          )}
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.red,
            tabBarIndicatorStyle: {
              backgroundColor: colors.red,
              height: 3,
              borderRadius: 50,
            },
            tabBarLabelStyle: fonts.EngSemiBold16,
            tabBarStyle: {
              backgroundColor: colors.white,
              padding: 2,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 0,
            },
          }}
        >
          <Tab.Screen name="Shape">
            {() => (
              <ShapeDetails
                onCharSelect={handleUpdateChar}
                color={selectedColor}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Colour">
            {() => <ColourDetails onColorSelect={handleUpdateColor} />}
          </Tab.Screen>
          <Tab.Screen name="Hat">
            {() => <HatDetails onHatSelect={handleUpdateHat} level={(userLevel) ? userLevel.level : 0} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.gray_bg,
  },
  toptab: {
    // display: 'inline-block',
    backgroundColor: colors.pink,
    textAlign: "center",
    height: "10.625%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.black,
  },
  tabContainer: {
    flex: 1,
    position: "absolute", // ทำให้สามารถใช้ตำแหน่งสัมพัทธ์
    bottom: 0, // ชิดขอบล่าง
    left: 0, // อาจต้องใช้สำหรับให้เริ่มที่มุมซ้าย
    right: 0, // ให้ครอบคลุมความกว้างทั้งหมด
    height: "45.125%",
  },
  eachcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 114,
    width: 114,
    margin: 10,
  },
  char: {
    width: "100%", // Adjust width as needed
    height: "100%", // Adjust height as needed
    resizeMode: "contain", // Adjust this as needed (cover, contain, etc.)
  },
  rowcontainer: {
    flex: 1, // Fill the screen
    flexDirection: "row", // Align children horizontally
  },
  colorbutton: {
    borderRadius: 50,
    height: 90,
    width: 90,
  },
  mainContainer: {
    top: "7%",
    alignItems: "center",
    flex: 1,
  },
  characterContainer: {
    height: 250,
    width: 250,
    position: "relative", // Ensures the child elements (hat) can be positioned absolutely inside this container
  },
  hatContainer: {
    height: "56%",
    width: "56%",
    top: "-104%",
    left: "22.5%",
  },
  selected: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.gray_button,
    borderRadius: 10,
    alignItems: "center",
  },
  unselected: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 10,
    alignItems: "center",
  },
  locked: {
    flex: 1,
    backgroundColor: colors.white,
    opacity: 0.35,
  },
  unlocked: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  lockTextContainer: {
    zIndex: 1,
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: '40%',
  },
  lockText: {
    color: colors.black,
  },
});
