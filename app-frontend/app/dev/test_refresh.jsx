import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Test_Refresh_Page = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    // loading code here
    const timeout = setTimeout(() => {
      setRefreshing(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  if (refreshing) {
    return <Text>Reloading...</Text>;
  }
  return (
    <View>
      <Text>Test_Refresh_Page</Text>
      <Text>Fished!!!</Text>
    </View>
  );
};

export default Test_Refresh_Page;

const styles = StyleSheet.create({});
