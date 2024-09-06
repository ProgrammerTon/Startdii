import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable,TouchableOpacity, TextInput } from 'react-native';
import { createGuild } from '../../services/GuildService';
import { useGlobalContext } from "../../context/GlobalProvider";
import { Alert } from "react-native";

const GuildCreateWindow = ({ visible, onClose, value, onSubmit}) => {
  const { user } = useGlobalContext();
  const [guildFormat, setGuildFormat] = useState({
    name: "",
    description: "",
    cover: 1,
  });

  const create = async () => {
    if (guildFormat.name === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    else {
      try {
        const data = await createGuild(user._id, guildFormat);
        if (!data) {
          Alert.alert("Guild creation failed");
        } else {
          Alert.alert("Guild successfully created");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.codeText}>Name </Text>
          <TextInput
            style={styles.createContainer}
            value={guildFormat.name}
            onSubmitEditing={onSubmit}
            onChangeText={(e) => setGuildFormat({ ...guildFormat, name: e })}
          />
          <Text style={styles.codeText}>Description </Text>
          <TextInput
            style={styles.createContainer}
            value={guildFormat.description}
            onSubmitEditing={onSubmit}
            onChangeText={(e) => setGuildFormat({ ...guildFormat, description: e })}
          />
          <Text style={styles.codeText}>Guild Cover </Text>
          <View style={styles.coverContainer}>

          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={create}
            >
              <Text style={styles.copyButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  copyButton: {
    flex: 1,
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  createContainer: {
    flexDirection: "row",
    backgroundColor: "#f4ede4",
    borderRadius: 15,
    paddingHorizontal: '50%',
    paddingVertical: '3%',
    paddingHorizontal: 15, 
    paddingVertical: 10,  
    marginBottom: 15,
    width: '100%',  
  },
  coverContainer: {
    width: '30%',
    height: '30%',
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  }
});

export default GuildCreateWindow;
