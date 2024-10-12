import React, { useState } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text , Alert} from 'react-native';
import Entypo from "@expo/vector-icons/Entypo";
import ReportUserWindow from './UserReport';
import colors from '../../constants/color';
const { width, height } = Dimensions.get('window');

const TestReportUser = ({userId}) => {
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
      
      <ReportUserWindow
        userId = {userId}
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={(reason, description) => {
          console.log("Selected Reason:", reason);
          console.log("Description:", description);
          Alert.alert("Report Success!");
          closeModal();
        }
   }
      />
    </>
  );
};

export default TestReportUser;

const styles = StyleSheet.create({
  reportButton: {
    height: 40,
    width: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    position: "absolute",
    right: -width * 0.05,
    borderRadius: 20,
    padding: 5,
  },
});
