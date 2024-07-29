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
import UserService from "../../services/UserService";

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (
      form.firstname === "" ||
      form.lastname ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Password doesn't match");
    }
    setSubmitting(true);
    try {
      const result = await UserService.registerUser(
        form.email,
        form.password,
        form.firstname,
        form.lastname
      );
      setUser(result);
      // setIsLogged(true);

      // router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-yellow-400">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-bold text-black">SignUp</Text>
          <View className=" mx-4 my-5 p-2 rounded-3xl bg-white">
            <FormField
              title="Firstname"
              value={form.firstname}
              handleChangeText={(e) => setForm({ ...form, firstname: e })}
              otherStyles="mt-7"
            />
            <FormField
              title="Lastname"
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
              otherStyles="mt-7"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <FormField
              title="ConfirmPassword"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              otherStyles="mt-7"
            />
            <TouchableOpacity
              className="bg-blue-600 h-11 w-20 flex-1 justify-center items-center rounded-xl my-3"
              onPress={submit}
            >
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-xl text-black">{user?.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
