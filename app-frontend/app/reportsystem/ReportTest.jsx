import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ReportQuizWindow from "./QuizReport";

const TestReport = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.reportButton} onPress={openModal}>
        <Entypo name="warning" size={16} color="white" />
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>

      <ReportQuizWindow
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={(reason, description) => {
          console.log("Selected Reason:", reason);
          console.log("Description:", description);
          closeModal();
        }}
      />
    </>
  );
};

export default TestReport;

const styles = StyleSheet.create({
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
});
