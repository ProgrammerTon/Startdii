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
import { router } from "expo-router";

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
    <SafeAreaView className="h-full bg-[#FEDD3A]">
      <ScrollView>
        <View
          className="flex-1 justify-center items-center px-11 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-bold text-black">Sign up</Text>
          <View className=" mx-4 my-5 p-5 rounded-[10px] bg-[#F6F6F6] w-full flex justify-center items-center">
            <FormField
              title="Firstname"
              value={form.firstname}
              handleChangeText={(e) => setForm({ ...form, firstname: e })}
              otherStyles="mt-3"
            />
            <FormField
              title="Lastname"
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
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
              title="ConfirmPassword"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              otherStyles="mt-3"
            />
            <View className="flex flex-row justify-between px-2 gap-11 mt-0.5">
              <TouchableOpacity
                className="bg-[#D9D9D9] h-[44px] w-[92px] flex justify-center items-center rounded-xl mt-5"
                onPress={() => {
                  router.replace("/");
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#0270ED] h-[44px] w-[92px] flex justify-center items-center rounded-xl mt-5"
                onPress={submit}
              >
                <Text className="text-white">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="text-xl text-black">{user?.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
