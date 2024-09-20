import { View, Text, StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const ScoreProgress = ({ percent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Progress bar */}
        <View style={[styles.ProcessContainer, { width: `${percent}%` }]}>
          <Text style={styles.percentText}>{`${Math.round(percent)}%`}</Text>
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
  },
  inputContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 35,
    paddingVertical: '0.5%',
    paddingHorizontal: '1%',
    top: '17%',
    right: '10%',
    overflow: 'hidden',
    borderWidth: 1, // Added border width
    borderColor: '#f4f4f4', // Border color
    alignSelf: 'center',
    marginLeft: '20%',
  },
  ProcessContainer: {
    backgroundColor: '#3342ff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  percentText: {
    color: '#fff', // Text color for visibility on the blue background
    fontWeight: 'bold', // Make the text bold
  },
});

export default ScoreProgress;
