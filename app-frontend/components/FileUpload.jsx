import React, { useState } from "react";
import { View, Button, Alert, FlatList, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { uploadFile } from "../services/MyFileService";
import { Image } from "expo-image";

const FileUpload = () => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false, // Allows the user to select any file
      });

      if (!result.canceled) {
        const successResult = result;

        // To limit the amount of documents that is added to the array "selectedDocuments"
        if (selectedDocuments.length + successResult.assets.length <= 1) {
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
      Alert.alert("Upload Success!!");
    }
    console.log("We Got", data);
  };

  const removeDocument = (index) => {
    setSelectedDocuments([]);
  };

  return (
    <View>
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
      <Button
        title="Pick an image from Gallery"
        onPress={() => pickDocuments()}
      />
      <Button title="Upload Image" onPress={() => uploadDocuments()} />
      <Button
        title="Remove File"
        onPress={() => {
          removeDocument();
        }}
      />
    </View>
  );
};

export default FileUpload;
