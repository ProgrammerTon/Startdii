import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";

export default function SafeAreaViewAndroid({ children, style }) {
  return (
    <SafeAreaView style={[safeStyle.AndroidSafeArea, style]}>
      {children}
    </SafeAreaView>
  );
}

const safeStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});
