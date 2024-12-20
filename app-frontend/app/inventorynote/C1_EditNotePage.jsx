import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import UploadCompleteWindow from "../../components/UploadCompleteWindow";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import { createSource } from "../../services/SourceService";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { uploadFile } from "../../services/MyFileService";
import { findSource, updateSource } from "../../services/SourceService";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import colors from "../../constants/color";
import fonts from "../../constants/font";
import Entypo from "@expo/vector-icons/Entypo";
import RecheckBox from "../../components/RecheckBox";
const { width, height } = Dimensions.get("window");
const EditNotePage = () => {
  const { sourceId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const { user } = useGlobalContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [AddUploadWindowVisible, setAddUploadWindowVisible] = useState(false);
  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] =
    useState(false);

  useEffect(() => {
    const fetchSource = async () => {
      const data = await findSource(sourceId);
      if (data) {
        setName(data.title);
        setDescription(data.description);
        setTag(data.tags.join(","));
        setContent(data.content);
      }
    };
    fetchSource();
  }, [sourceId]);

  const ShowUploadComplete = () => {
    setAddUploadWindowVisible(true);
  };

  const CloseUploadComplete = () => {
    setAddUploadWindowVisible(false);
    router.back();
    router.back();
  };

  const ShowErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true);
  };

  const CloseErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false);
  };

  const resetFields = () => {
    setName("");
    setDescription("");
    setTag("");
    setContent("");
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const Publish = async () => {
    if (isPublishing) return;
    setIsPublishing(true);

    // Check if all the required fields are not null or empty
    if (!name || !description || !content || !tag) {
      Alert.alert("Error", "Please fill in all the fields.");
      setIsPublishing(false);
      return;
    }

    const updatedData = {
      ...(name && { title: name }),
      ...(description && { description }),
      ...(content && { content }),
      ...(tag && { tags: tag.split(",") }),
    };

    try {
      const res = await updateSource(sourceId, updatedData);
      if (res) {
        ShowUploadComplete();
      } else {
        Alert.alert("Update failed.");
      }
    } catch (error) {
      console.error("Error updating source:", error);
      Alert.alert("An error occurred while updating.");
    } finally {
      setIsPublishing(false);
    }
  };

  //---File Upload---//
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false, // Allows the user to select any file
      });

      if (!result.canceled) {
        const successResult = result;

        // To limit the amount of documents that is added to the array "selectedDocuments"
        if (successResult.assets.length <= 1) {
          setSelectedDocuments([...successResult.assets]);
        } else {
          console.log("Maximum of 1 documents allowed.");
        }
      } else {
        console.log("Document selection cancelled.");
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  const createFormData = (documents) => {
    const formData = new FormData();

    documents.forEach((document, index) => {
      const { uri, name, mimeType } = document;
      formData.append("files", {
        uri,
        name,
        type: mimeType,
      });
    });

    return formData;
  };

  const uploadDocuments = async () => {
    const formData = await createFormData(selectedDocuments);
    const data = await uploadFile(formData);
    if (data) {
      setSelectedDocuments([]);
    }
    console.log("We Got", data);
    return data;
  };

  const removeDocument = (index) => {
    setSelectedDocuments([]);
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
        <Text style={[fonts.EngBold22, styles.headerText]}>Edit Note</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={[fonts.EngSemiBold16, styles.label]}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
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

        <Text style={[fonts.EngSemiBold16, styles.label]}>
          Tag (Use comma to seperate Tag. Ex. : KU,Mining)
        </Text>
        <TextInput
          style={styles.input}
          value={tag}
          onChangeText={setTag}
          placeholder="Tag"
        />

        <Text style={[fonts.EngSemiBold16, styles.label]}>Content</Text>

        <TextInput
          style={styles.textarea}
          value={content}
          onChangeText={setContent}
          placeholder="Description"
          multiline
        />

        <FlatList
          data={selectedDocuments}
          scrollEnabled={false}
          renderItem={(item) => {
            // return <Text>{item.item.name}</Text>;
            return (
              <Image
                source={{ uri: item.item.uri }}
                style={{ width: 200, height: 200 }} // Adjust the width/height as needed
              />
            );
          }}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickDocuments}>
            <Text style={[fonts.EngMedium16, styles.uploadButtonText]}>
              Upload
            </Text>
          </TouchableOpacity>
          {selectedDocuments.length >= 1 ? (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={removeDocument}
            >
              <Text style={[fonts.EngMedium16, styles.uploadButtonText]}>
                Cancel Upload
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={openModal}>
            <Text style={[fonts.EngMedium16, styles.resetButtonText]}>
              Reset
            </Text>
          </TouchableOpacity>
          <RecheckBox
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onYesPress={resetFields}
            title="Are you sure you want to reset ?"
            yes="Yes, Reset"
            no="Cancel"
          />

          <TouchableOpacity style={styles.publishButton} onPress={Publish}>
            <Text style={[fonts.EngMedium16, styles.publishButtonText]}>
              Publish
            </Text>
          </TouchableOpacity>
          <ErrorEmptyFieldWindow
            visible={AddErrorEmptyFieldWindow}
            onClose={CloseErrorEmptyFieldWindow}
          />
          <UploadCompleteWindow
            visible={AddUploadWindowVisible}
            onClose={CloseUploadComplete}
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
    backgroundColor: colors.yellow,
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
    padding: 20,
    paddingBottom: 30,
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
  uploadButton: {
    height: 42,
    paddingHorizontal: 25,
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadButtonText: {
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
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

export default EditNotePage;
