import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import fonts from "../constants/font";
import colors from "../constants/color";

const GoalProcess = ({
  title,
  percent,
  otherStyles,
}) => {

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={[fonts.ThaiMedium18, styles.title]}>{title}</Text>
      <View style={[styles.inputContainer, otherStyles]}>
        <View style={[styles.ProcessContainer, { width: percent }]}>
          <Text style={[fonts.EngBold22, styles.PercentText]}>{percent}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    marginTop: '4%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    width: '85%',
    marginLeft: '5%',
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    shadowColor: colors.gray_bgblur,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '87%',
    height: 70,
    paddingVertical: '0.5%',
    paddingHorizontal: '1%',
  },
  ProcessContainer: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    padding: '4%',
  },
  PercentText: {
    flex: 1,
    color: colors.white,
  }
});

export default GoalProcess;
