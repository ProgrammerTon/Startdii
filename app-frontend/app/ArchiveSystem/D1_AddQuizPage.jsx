import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Redirect, router } from "expo-router";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import { useQuizContext } from "../../context/QuizProvider";
import colors from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const AddQuizPage = () => {
  const { title, setTitle, description, setDescription, tags, setTags } =
    useQuizContext();

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setTags("");
  };

  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] =
    useState(false);

  const ShowErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true);
  };

  const CloseErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false);
  };

  const Next = async () => {
    if (title === "" || description === "" || tags === "") {
      ShowErrorEmptyFieldWindow();
    } else {
      router.push("/ArchiveSystem/D2_QuizMaker");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.green} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Quiz</Text>
      </View>
      <ScrollView style={styles.content}>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Name"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <Text style={styles.label}>Tag</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Tags"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishButton} onPress={Next}>
            <Text style={styles.publishButtonText}>Next</Text>
          </TouchableOpacity>
          <ErrorEmptyFieldWindow
            visible={AddErrorEmptyFieldWindow}
            onClose={CloseErrorEmptyFieldWindow}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    height: height * 0.1,
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    padding: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  uploadButton: {
    width: 100,
    height: 40,
    backgroundColor: "#4d90fe",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    width: 100,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: "#000",
    fontSize: 16,
  },
  publishButton: {
    width: 100,
    height: 40,
    backgroundColor: "#3367d6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddQuizPage;
