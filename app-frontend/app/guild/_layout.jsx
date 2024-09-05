import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import GuildProvider from "../../context/GuildProvider";

const _layout = () => {
  return (
    <GuildProvider>
      <Slot />
    </GuildProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
