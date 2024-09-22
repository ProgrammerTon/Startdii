import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import * as Animatable from "react-native-animatable";
import Profile from "../(tabs)/profile";
import Search from "../(tabs)/search";
import HiUserGroup from "../../components/HiUserGroupIcon";
import HiSearch from "../../components/HiSearchIcon";
import HiFolder from "../../components/HiFolderIcon";
import HiChatAlt2 from "../../components/HiChatAlt2Icon";
import HiUser from "../../components/HiUserIcon";
import Guild from "./guild";
import ArchiveMainPage from "./archive";
import ChatH1 from "../(tabs)/chat";

const TabArr = [
  { route: "Guild", label: "Guild", icon: HiUserGroup, component: Guild },
  { route: "Search", label: "Search", icon: HiSearch, component: Search },
  {
    route: "Archive",
    label: "Archive",
    icon: HiFolder,
    component: ArchiveMainPage,
  },
  { route: "Chat", label: "Chat", icon: HiChatAlt2, component: ChatH1 },
  { route: "Profile", label: "Profile", icon: HiUser, component: Profile },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -7 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -7 },
  1: { scale: 1, translateY: 7 },
};

const frame1 = {
  0: { scale: 0 },
  0.3: { scale: 0.2 },
  0.5: { scale: 0.5 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const frame2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const frameRef = useRef(null);
  const textRef = useRef(null);

  // const { colors } = useTheme();

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      frameRef.current.animate(frame1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      frameRef.current.animate(frame2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  const IconComponent = item.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={[styles.btn]}>
          <Animatable.View ref={frameRef} style={styles.frame} />
          <IconComponent width={40} height={40} />
          <Animatable.Text
            ref={textRef}
            style={[styles.text, fonts.EngSemiBold10]}
          >
            {item.label}
          </Animatable.Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  tabBar: {
    height: 85,
    position: "absolute",
    backgroundColor: colors.blue,
  },
  btn: {
    width: 64,
    height: 73,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
  },
  frame: {
    ...StyleSheet.absoluteFillObject,
    width: 64,
    height: 73,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.pink,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
  },
});
