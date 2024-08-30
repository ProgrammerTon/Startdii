import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import Babypinksvg from "../../components/Babypinksvg";
import { registerUser } from "../../services/UserService";

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (
      form.firstname === "" ||
      form.lastname === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === "" ||
      form.username === ""
    ) {
      console.log(form);
      Alert.alert("Error", "Please fill in all fields");
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Password doesn't match");
    }
    setSubmitting(true);
    try {
      const result = await registerUser(
        form.email,
        form.password,
        form.username,
        form.firstname,
        form.lastname
      );
      console.log(result);
      if (!result) {
        Alert.alert("Server Error");
      } else {
        router.push("/sign-in");
      }
      // setIsLogged(true);

      // router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    bg: {
      height: "100%",
      backgroundColor: colors.yellow,
    },
    container: {
      position: "relative",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: "3%",
      paddingVertical: "22%",
      marginVertical: "3%",
      minHeight: Dimensions.get("window").height - 20,
    },
    frame: {
      margin: "3%",
      paddingHorizontal: "1%",
      paddingTop: "10%",
      paddingBottom: "18%",
      borderRadius: 10,
      backgroundColor: colors.gray_bg,
      width: "95%",
      height: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      gap: 25,
      shadowColor: colors.gray_bgblur,
      shadowOffset: [{ width: 0, height: 0 }],
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    signInText: {
      fontSize: 38,
      color: colors.black,
      textAlign: "left",
      alignSelf: "flex-start",
      marginLeft: "7%",
    },
    svgLayer: {
      position: "absolute",
      top: "5%",
      left: "22%",
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 30,
      alignItems: "center",
      bottom: "10.5%",
      position: "absolute",
    },
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.svgLayer}>
            <Babypinksvg width={Dimensions.get("window").width} height={185} />
          </View>
          <Text style={[fonts.EngBold22, styles.signInText]}>Sign up</Text>
          <View style={styles.frame}>
            <FormField
              title="First Name"
              value={form.firstname}
              handleChangeText={(e) => setForm({ ...form, firstname: e })}
              otherStyles="mt-3"
            />

            <FormField
              title="Last Name"
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
              otherStyles="mt-3"
            />

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-3"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-3"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-3"
            />

            <FormField
              title="Confirm Password"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              otherStyles="mt-3"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              color={colors.gray_button}
              textcolor={colors.black}
              onPress={() => router.push("/")}
            />
            <Button
              title="Create"
              color={colors.blue}
              textcolor={colors.white}
              onPress={submit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
