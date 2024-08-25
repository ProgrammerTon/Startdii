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
      position: 'relative',
      flex: 1, // Equivalent to flex-1
      justifyContent: 'center', // Equivalent to justify-center
      alignItems: 'center', // Equivalent to items-center
      paddingHorizontal: '3%',
      paddingVertical: '80%',
      marginVertical: '3%',
      minHeight: Dimensions.get('window').height - 100,
    },
    frame: {
      margin: '3%',
      paddingHorizontal: '1%',
      paddingTop: '18%',
      paddingBottom: '20%',
      borderRadius: 10, // Equivalent to rounded-[10px]
      backgroundColor: colors.gray_bg,
      width: '95%',
      height: '100%',
      flex: 1, // Assuming you want to use flex to fill available space
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.gray_bgblur,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    signInText: {
      fontSize: 34,
      color: colors.black,
      textAlign: "left",
      alignSelf: "flex-start",
      marginLeft: '7%',
    },
    box: {
      position: 'absolute',
      top: '183%',
      left: '55%',
      transform: [{ translateX: -50 }, { translateY: -50 }], // This will center the box
    },
    box2: {
      alignSelf: 'flex-end',
      right: '5%',
      bottom: '5%',
    },
    text: {
      color: colors.blue,
      textDecorationLine: 'underline',
    },
    text2: {
      color: colors.black,
      marginRight: '3%',
    },
    box3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: '8%',
    },
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[fonts.EngBold22, styles.signInText]}>Sign in</Text>
          <View style={styles.frame}>

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

            <TouchableOpacity
              style={styles.box2}
              onPress={submit}
            >
              <Text style={[fonts.EngMedium12, styles.text]}>Forgot Password ?</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.box}>
            <Button
              title="Sign in"
              onPress={submit}
            />
            <Text className="text-xl text-black">{user?.email}</Text>
          </View>
          <View style={styles.box3}>
            <Text style={[fonts.EngMedium14, styles.text2]}>Don’t have an account?</Text>
            <TouchableOpacity onPress={submit}>
              <Text style={[fonts.EngMedium14, styles.text]}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
