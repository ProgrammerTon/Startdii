import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const FileUpload = () => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true, // Allows the user to select any file
      });

      if (!result.canceled) {
        const successResult = result;

        // To limit the amount of documents that is added to the array "selectedDocuments"
        if (selectedDocuments.length + successResult.assets.length <= 5) {
          setSelectedDocuments((prevSelectedDocuments) => [
            ...prevSelectedDocuments,
            ...successResult.assets,
          ]);
        } else {
          console.log("Maximum of 5 documents allowed.");
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
    const formData = createFormData(selectedDocuments);

    try {
      const response = await fetch("https://data.236sec.org/files/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (err) {
      console.error("Error uploading documents:", err);
    }
  };

  const removeDocument = (index) => {
    setSelectedDocuments((prevSelectedDocuments) =>
      prevSelectedDocuments.filter((_, i) => i !== index)
    );
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickDocuments} />
      <Button title="Upload Image" onPress={uploadDocuments} />
    </View>
  );
};

export default FileUpload;
