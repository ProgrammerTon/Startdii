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
  import AuthService from "../../services/AuthService"
  import { router } from "expo-router";
  
  export default function CreateNotePage() {
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
      title: "",
      description: "",
      tags: [],
      content: "",
      userId: "",
    });
  
    const submit = async () => {
      if (
        form.name === "" ||
        form.description === ""
      ) {
        Alert.alert("Error", "Please fill in all fields");
      }
      setSubmitting(true);
      try {
        // const result = await AuthService.loginUser(
        //   form.name,
        //   form.password,
        // )
        // setUser(result);
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
            <Text className="text-2xl font-bold text-black">Create Note</Text>
            <View className=" mx-4 my-5 p-5 rounded-[10px] bg-[#F6F6F6] w-full flex justify-center items-center">
              <FormField
                title="Name"
                value={form.title}
                handleChangeText={(e) => setForm({ ...form, title: e })}
                otherStyles="mt-3"
              />
  
              <FormField
                title="Description"
                value={form.description}
                handleChangeText={(e) => setForm({ ...form, description: e })}
                otherStyles="mt-3"
              />
              <FormField
                title="Tag"
                value={form.tags}
                handleChangeText={(e) => setForm({ ...form, tags: e })}
                otherStyles="mt-3"
              />
              <FormField
                title="Content"
                value={form.content}
                handleChangeText={(e) => setForm({ ...form, content: e })}
                otherStyles="mt-3"
              />
              <View className="flex flex-row justify-between px-2 gap-11 mt-0.5">
                <TouchableOpacity
                  className="bg-[#D9D9D9] h-[44px] w-[92px] flex justify-center items-center rounded-xl mt-5"
                  onPress={() => {
                    setForm({
                        title: "",
                        description: "",
                        tags: [],
                        content: "",
                        userId: "",
                      })
                  }}
                >
                  <Text>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#0270ED] h-[44px] w-[92px] flex justify-center items-center rounded-xl mt-5"
                  onPress={submit}
                >
                  <Text className="text-white">Publish</Text>
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
  