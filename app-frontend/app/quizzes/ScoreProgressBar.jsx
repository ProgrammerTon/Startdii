import { View, Text, StyleSheet,Dimensions } from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width, height } = Dimensions.get('window');
const ScoreProgress = ({ percent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Progress bar */}
        <View style={[styles.ProcessContainer, { width: `${percent}%` }]}>
          <Text style={[fonts.EngBold16, styles.percentText]}>{`${Math.round(percent)}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width*0.05,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingVertical: '1%',
    paddingHorizontal: '1%',
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ProcessContainer: {
    backgroundColor: colors.pink,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  percentText: {
    color: colors.white,
  },
});

export default ScoreProgress;
