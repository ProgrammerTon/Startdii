import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FileUpload from "../../components/FileUpload";

const UploadPage = () => {
  return (
    <ScrollView>
      <Text>UploadPage</Text>
      <FileUpload />
    </ScrollView>
  );
};

export default UploadPage;

const styles = StyleSheet.create({});
