import React, { useState } from "react";
import { TouchableOpacity, Dimensions, StyleSheet, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ReportQuizWindow from "./QuizReport";
const { width, height } = Dimensions.get("window");
import colors from "../../constants/color";

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
        <Entypo name="warning" size={18} color={colors.white} />
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
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    borderRadius: 50,
    marginLeft: 10,
  },
});
