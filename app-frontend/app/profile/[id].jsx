import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { ScrollView } from "react-native";
import AuthService from "../../services/AuthService";
import { router, useLocalSearchParams } from "expo-router";
import { useCharContext, CharacterContext } from "../profile/charcontext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import fonts from "../../constants/font";
import SignoutButton from "../../components/SignoutButton";
import PencilIcon from "../../components/PencilIcon";
import Level from "../../components/Level";
import Char1 from "../../components/charactor/Charactor01";
import Char2 from "../../components/charactor/Charactor02";
import Char3 from "../../components/charactor/Charactor03";
import Char4 from "../../components/charactor/Charactor04";
import Char5 from "../../components/charactor/Charactor05";
import Char6 from "../../components/charactor/Charactor06";
import OtherUserMenu from "../../components/Menuotheruser";
import WeeklyGoals from "../../components/WeeklyGoal";
import Inventory from "../../components/Inventory";
import Frame from "../../components/Frame";
import QuizHistory from "../../components/QuizHistory";
import { useGlobalContext } from "../../context/GlobalProvider";
import DevPage from "../dev/index";
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
import colors from "../../constants/color";
import { getOtherProfile } from "../../services/UserService";
import { getUserLevel } from "../../services/LevelService";

export default function ProfileTest() {
  const { id } = useLocalSearchParams();
  const [activeMenu, setActiveMenu] = useState("Inventory");
  const [selectedChar, setSelectedChar] = useState("Char1");
  const [selectedColor, setSelectedColor] = useState(colors.green);
  const [selectedHat, setSelectedHat] = useState("HNone");
  const [user, setUser] = useState(null);
  const { isLogged } = useGlobalContext();
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    if (id) {
      loadUserLevel();
    }
  }, [id]);

  const loadUserLevel = async () => {
    const user_lvl = await getUserLevel(id);
    setUserLevel(user_lvl);
  };

  useEffect(() => {}, []);

  const getCharacterComponent = React.useMemo(() => {
    switch (selectedChar) {
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
  }, [selectedChar, selectedColor]);

  const getHatComponent = React.useMemo(() => {
    switch (selectedHat) {
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
  }, [selectedHat, setSelectedHat]);

  const renderHeader = () => (
    <>
      <View style={styles.levelContainer}>
        <Level
          level={userLevel?.level ? userLevel.level : 0}
          percent={`${
            userLevel?.current_exp / userLevel?.required_exp < 1
              ? Math.round(
                  (userLevel?.current_exp / userLevel?.required_exp) * 100
                )
              : 100
          }%`}
        />
      </View>

      <View style={styles.charContainer}>
        {getCharacterComponent}
        <View style={styles.hatContainer}>{getHatComponent}</View>
      </View>
      <View style={styles.frameContainer}>
        <Frame />
        <View style={styles.textContainer}>
          <Text style={[fonts.EngMedium22, styles.text]}>
            {userLevel?.user_title}
          </Text>
        </View>
      </View>
      <OtherUserMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "Inventory":
        return <Inventory id={id} />;
    }
  };

  const menuItems = [
    { id: "1", name: "Weekly Goals" },
    { id: "2", name: "Inventory" },
    { id: "3", name: "History" },
  ];

  const fetchProfile = async () => {
    const data = await getOtherProfile(id);
    if (!data) {
      Alert.alert("User Not Found");
    }
    console.log("Other User Data", data);
    setUser(data);
    setSelectedChar(data.character);
    setSelectedColor(data.characterColor);
    setSelectedHat(data.characterHat);
  };

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else {
      fetchProfile();
    }
  }, []);

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.toptab}>
        <TouchableOpacity style={styles.usernameContainer}>
          <Text style={[fonts.EngBold22, styles.username]}>
            {user?.username}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[{}]} // Ensuring there is data to render the header.
        renderItem={() => renderContent()}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = {
  bg: {
    height: "100%",
    backgroundColor: colors.gray_bg,
  },
  toptab: {
    backgroundColor: colors.pink,
    textAlign: "center",
    height: "10.625%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "relative",
  },
  usernameContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  username: {
    color: colors.black,
    fontSize: 24,
  },
  signoutContainer: {
    position: "absolute",
    right: 20,
  },
  pencilContainer: {
    bottom: -2,
    marginLeft: 6,
  },
  goalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  levelContainer: {
    alignItems: "center",
    left: "3%",
  },
  charContainer: {
    height: 400,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "-10%",
    marginTop: "-10%",
  },
  hatContainer: {
    position: "absolute",
    height: "56%",
    width: "56%",
    top: "-4%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  frameContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: "8%",
  },
  frame: {
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
};
