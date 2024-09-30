import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createGuild } from "../../services/GuildService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Alert } from "react-native";
import { Image } from "expo-image";
import colors from "../../constants/color";
import fonts from "../../constants/font";
import images from "../../constants/images";

const GuildCreateWindow = ({ visible, onClose, value, onSubmit, loadData }) => {
  const { user } = useGlobalContext();
  const [guildFormat, setGuildFormat] = useState({
    name: "",
    description: "",
    cover: 1,
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedCover, setSelectedCover] = useState(guildFormat.cover);

  const create = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    if (guildFormat.name === "") {
      Alert.alert("Error", "Please fill in all fields");
      setIsPublishing(false);
    } else {
      try {
        const data = await createGuild(user._id, guildFormat);
        if (!data) {
          Alert.alert("Guild creation failed");
        } else {
          Alert.alert("Guild successfully created");
          setGuildFormat({
            name: "",
            description: "",
            cover: 1,
          }); // Clear the input fields
          loadData();
          setIsPublishing(false);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const selectCover = (coverNumber) => {
    setSelectedCover(coverNumber); // Update selected cover
    setGuildFormat({ ...guildFormat, cover: coverNumber }); // Update guild format
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
          <Text style={[fonts.EngBold18, styles.codeText]}>Name</Text>
          <TextInput
            style={styles.createContainer}
            value={guildFormat.name}
            onSubmitEditing={onSubmit}
            onChangeText={(e) => setGuildFormat({ ...guildFormat, name: e })}
          />
          <Text style={[fonts.EngBold18, styles.codeText]}>Description</Text>
          <TextInput
            style={styles.createContainer}
            value={guildFormat.description}
            onSubmitEditing={onSubmit}
            onChangeText={(e) =>
              setGuildFormat({ ...guildFormat, description: e })
            }
          />
          <Text style={[fonts.EngBold18, styles.codeText]}>Guild Cover</Text>
          <View style={styles.coverContainer}>
            <TouchableOpacity
              style={[
                styles.cover,
                selectedCover === 1 && styles.selectedCover,
              ]}
              onPress={() => selectCover(1)}
            >
              <Image
                style={styles.guildImage}
                source={images.guildcover1}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cover,
                selectedCover === 2 && styles.selectedCover,
              ]}
              onPress={() => selectCover(2)}
            >
              <Image
                style={styles.guildImage}
                source={images.guildcover2}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cover,
                selectedCover === 3 && styles.selectedCover,
              ]}
              onPress={() => selectCover(3)}
            >
              <Image
                style={styles.guildImage}
                source={images.guildcover3}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[fonts.EngMedium16, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                create();
                onClose();
              }}
            >
              <Text style={[fonts.EngMedium16, styles.copyButtonText]}>
                Create
              </Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(145, 145, 145, 0.7)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.gray_bg,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray_button,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 50,
  },
  cancelButtonText: {
    color: colors.black,
  },
  copyButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 50,
  },
  copyButtonText: {
    color: colors.white,
  },
  codeText: {
    color: colors.black,
    marginBottom: 10,
    alignSelf: "flex-start",
    left: 10,
  },
  createContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingHorizontal: "50%",
    paddingVertical: "3%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  coverContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 25,
  },
  guildImage: {
    width: 110,
    height: 110,
  },
  cover: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.gray_bg,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 7,
    alignItems: "center",
  },
  selectedCover: {
    borderColor: colors.gray_font,
  },
});

export default GuildCreateWindow;
