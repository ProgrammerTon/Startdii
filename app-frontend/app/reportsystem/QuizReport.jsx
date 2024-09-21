import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import { getCurrentToken } from "../../utils/asyncstroage";
import { reportToAdmin } from "../../services/ReportService";
import { useQuestionContext } from "../../context/QuestionProvider";
const { width, height } = Dimensions.get("window");

// Reason Modal Component
const ReasonModal = ({ visible, onClose, onSelectReason, reasonButtonY }) => {
  const reasons = [
    "Incorrect Solution",
    "Misleading Question",
    "Inappropriate Content",
    "Plagiarism",
  ];
  const startPosition = 80;
  const slideAnimation = useRef(new Animated.Value(startPosition)).current;

  if (visible) {
    slideAnimation.setValue(startPosition);
    Animated.timing(slideAnimation, {
      toValue: height * 0.11,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.reasonModalContainer,
            { transform: [{ translateY: slideAnimation }] },
          ]}
        >
          {reasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonButton}
              onPress={() => onSelectReason(reason)}
            >
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

// Main ReportQuizWindow Component
const ReportQuizWindow = ({ visible, onClose, onSubmit }) => {
  const [reasonModalVisible, setReasonModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Select reason");
  const [description, setDescription] = useState("");
  const [reasonButtonY, setReasonButtonY] = useState(0); // Get the Y position of the reason button
  const { questions, quizId, quizFinished, setQuizFinished } =
    useQuestionContext();
  // Function to handle reason selection
  const handleSelectReason = (reason) => {
    setSelectedReason(reason);
    setReasonModalVisible(false);
  };

  // Function to handle submit

  const handleSubmit = async () => {
    if (selectedReason === "Select reason" || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = await getCurrentToken();
      const targetId = await quizId;
      console.log("Retrieved Token:", token || "No Token Found");
      console.log("User Token:", token);
      console.log("Retrieved Target Id:", targetId);
      if (!token) {
        alert("Failed to retrieve token.");
        return;
      }

      const data = {
        token: token,
        targetId: targetId,
        option: "quiz",
        reason: selectedReason,
        description: description,
      };

      console.log(data);
      const res = await reportToAdmin(data);

      if (!res) {
        alert("Failed to submit report.");
        return;
      }

      onSubmit(selectedReason, description);
      resetForm();
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedReason("Select reason");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Orange Header with rounded corners */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Report Quiz</Text>
          </View>
          <View style={styles.modalContent}>
            {/* Select Reason */}
            <TouchableOpacity
              style={styles.selectReasonContainer}
              onPress={(e) => {
                e.target.measure((fx, fy, width, height, px, py) => {
                  setReasonButtonY(py); // Set the Y coordinate of the button for animation
                });
                setReasonModalVisible(true);
              }}
            >
              <Text>{selectedReason}</Text>
            </TouchableOpacity>

            {/* Description Label */}
            <Text style={styles.descriptionLabel}>Description</Text>

            {/* Description Input */}
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Describe the issue here"
              multiline
            />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Reason Modal */}
      <ReasonModal
        visible={reasonModalVisible}
        onClose={() => setReasonModalVisible(false)}
        onSelectReason={handleSelectReason}
        reasonButtonY={reasonButtonY}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOverlayReason: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    padding: 20,
    width: "100%",
  },
  header: {
    width: "100%",
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    borderColor: "#FF5722",
    borderWidth: 1,
  },
  headerText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  reasonModalContainer: {
    position: "absolute",
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  reasonButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
    alignItems: "center",
  },
  reasonText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  selectReasonContainer: {
    backgroundColor: "#f4ede4",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  descriptionLabel: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: "#f4ede4",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    textAlignVertical: "top",
    height: 80,
  },
});

export default ReportQuizWindow;
