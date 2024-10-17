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
import fonts from "../../constants/font";
import RecheckBox from "../../components/recheckbox";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const AddQuizPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const { title, setTitle, description, setDescription, tags, setTags } =
    useQuizContext();

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
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
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>Create Quiz</Text>
      </View>
      <ScrollView style={styles.content}>

        <Text style={[fonts.EngSemiBold16, styles.label]}>Name</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Name"
        />

        <Text style={[fonts.EngSemiBold16, styles.label]}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <Text style={[fonts.EngSemiBold16, styles.label]}>Tag</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Tags"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={openModal}>
            <Text style={[fonts.EngMedium16, styles.resetButtonText]}>Reset</Text>
          </TouchableOpacity>
          <RecheckBox
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onYesPress={resetFields}
            title="Are you sure you want to reset ?"
            yes="Yes, Reset"
            no="Cancel"
          />

          <TouchableOpacity style={styles.publishButton} onPress={Next}>
            <Text style={[fonts.EngMedium16, styles.publishButtonText]}>Next</Text>
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
    backgroundColor: colors.gray_bg,
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
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    color: colors.black,
  },
  content: {
    padding: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black,
  },
  input: {
    height: 40,
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  textarea: {
    height: 80,
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    height: 42,
    paddingHorizontal: 25,
    backgroundColor: colors.gray_button,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: colors.black,
  },
  publishButton: {
    height: 42,
    paddingHorizontal: 25,
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  publishButtonText: {
    color: colors.white,
  },
});

export default AddQuizPage;
