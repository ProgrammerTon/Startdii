import React, { useState ,useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
import { findSource,updateSource } from "../../services/SourceService";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
const EditNotePage = () => {
  const { sourceId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const { user } = useGlobalContext();

  const [AddUploadWindowVisible, setAddUploadWindowVisible] = useState(false);
  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] = useState(false);

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
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const Publish = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
  
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
        router.back();
        router.back();
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
      <ScrollView>
        <Text style={styles.title}>Note</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
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

        <Text style={styles.label}>
          Tag (Use comma to seperate Tag. Example : KU,Mining)
        </Text>
        <TextInput
          style={styles.input}
          value={tag}
          onChangeText={setTag}
          placeholder="Tag"
        />

        <Text style={styles.label}>Content</Text>

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
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
          {selectedDocuments.length >= 1 ? (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={removeDocument}
            >
              <Text style={styles.resetButton}>Cancel Upload</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishButton} onPress={Publish}>
            <Text style={styles.publishButtonText}>Publish</Text>
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
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
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
    height: 80,
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

export default EditNotePage;
