import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import fonts from "../constants/font";
import colors from "../constants/color";
import { Shadow } from "react-native-shadow-2";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ispass,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={fonts.EngMedium14}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          onChangeText={handleChangeText}
          secureTextEntry={ispass}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "1%",
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    shadowColor: colors.gray_bgblur,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow equivalent
    flexDirection: "row", // Equivalent to flex flex-row
    alignItems: "center", // Equivalent to items-center
    width: "91.666667%", // Equivalent to w-11/12
    height: "44px",
    padding: "3%",
    marginTop: "2%",
  },
  textInput: {
    flex: 1,
    color: colors.black,
    fontFamily: "InterMedium",
    fontWeight: "medium",
    fontSize: 14,
  },
});

export default FormField;
