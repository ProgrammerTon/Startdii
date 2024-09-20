import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ReportQuizWindow from './QuizReport';
const TestReport = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const openAddWindow = () => {
    setModalVisible(true);
  };

  const closeAddWindow = () => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={openAddWindow}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <ReportQuizWindow
        visible={isModalVisible}
        onClose={closeAddWindow}
        onSubmit={(reason, description) => {
        console.log("Selected Reason:", reason);
        console.log("Description:", description);
        setModalVisible(false);  
  }}
/>
    </View>
  );
};

export default TestReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  floatingButton: {
    backgroundColor: "#FF6347",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ef6d11",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});