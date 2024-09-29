import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import fonts from "../constants/font";
import colors from "../constants/color";
import { TabBarIndicator } from "react-native-tab-view";

function Weekly_Goals() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray_bg,
      }}
    >
      <Text style={{ fontSize: 20, color: colors.black, fontWeight: "800" }}>
        Weekly Goals is here!
      </Text>
    </View>
  );
}

function Inventory() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray_bg,
      }}
    >
      <Text style={{ fontSize: 20, color: colors.black, fontWeight: "800" }}>
        Inventory is here!
      </Text>
    </View>
  );
}


function History() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray_bg,
      }}
    >
      <Text style={{ fontSize: 20, color: colors.black, fontWeight: "800" }}>
        History is here!
      </Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Weekly_Goals"
      screenOptions={{
        tabBarActiveTintColor: colors.red,
        tabBarIndicatorStyle: {
          backgroundColor: colors.red,
          height: 2,
        },
        labelStyle: fonts.EngSemiBold12,
        tabBarStyle: { backgroundColor: colors.gray_bg },
      }}
    >
      <Tab.Screen
        name="Weekly_Goals"
        component={Weekly_Goals}
        options={{ tabBarLabel: "Weekly Goals" }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{ tabBarLabel: "Inventory" }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: "History" }}
      />
    </Tab.Navigator>
  );
}

export default function TabBarNavigator() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
