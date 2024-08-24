import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import FormField from "../../components/FormField";
import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import AuthService from "../../services/AuthService";
import { router } from "expo-router";
import fonts from "../../constants/font";
import { Shadow } from 'react-native-shadow-2';
import colors from "../../constants/color";

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (
      form.email === "" ||
      form.password === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    try {
      const result = await AuthService.loginUser(
        form.email,
        form.password,
      )
      setUser(result);
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
      height: '100%',
      backgroundColor: colors.yellow,
    },
    container: {
      flex: 1, // Equivalent to flex-1
      justifyContent: 'center', // Equivalent to justify-center
      alignItems: 'center', // Equivalent to items-center
      paddingHorizontal: '3%',
      paddingVertical: '80%',
      marginVertical: '3%',
      minHeight: Dimensions.get('window').height - 100,
    },
    frame: {
      marginHorizontal: '3%',
      marginVertical: '3%',
      paddingHorizontal: '6%',
      paddingVertical: '6%',
      borderRadius: 10, // Equivalent to rounded-[10px]
      backgroundColor: colors.gray_bg,
      width: '100%',
      height: '100%',
      flex: 1, // Assuming you want to use flex to fill available space
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInText: {
      fontSize: 30,
      color: colors.black,
      textAlign: "left",
      alignSelf: "flex-start",
      marginLeft: '9%',
    },
    box: {
      position: 'absolute',
      top: '208%',
      left: '40%',
    },
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[fonts.EngBold22, styles.signInText]}>Sign in</Text>
          <Shadow
            distance={20}
            startColor="rgba(145, 145, 145, 0.05)"
            offset={[0, 0]}
          >
            <View style={styles.frame}>

              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-3"
                keyboardType="email-address"
              // style={{
              //   shadowColor: "#919191", // Shadow color
              //   shadowOpacity: 0.25, // Shadow opacity (25%)
              //   shadowOffset: { width: 0, height: 0 }, // Offset (x, y)
              //   shadowRadius: 8, // Blur radius
              //   elevation: 4, // Elevation for Android (controls shadow depth)
              // }}
              />

              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-3"
              />
            </View>
          </Shadow>
          <View style={styles.box}>
              <View className="flex flex-row justify-between px-2 gap-11 mt-0.5">
                <TouchableOpacity
                  className="bg-[#0270ED] h-[44px] w-[92px] flex justify-center items-center rounded-[50px] mt-5"
                  onPress={submit}
                  >
                  <Text className="text-white">Sign in</Text>
                </TouchableOpacity>
              </View>
            <Text className="text-xl text-black">{user?.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
