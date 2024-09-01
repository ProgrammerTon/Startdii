import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet
} from "react-native";
import { React , useState } from "react";
import QuizChoice from "../../components/QuizChoice";
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default function Quiz4choice() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const quizData = [
    {
      totalQuestion: 5,
      questionId: 1,
      question: "What does the cat says?",
      choicecount: 5,
      choice: ["Meaw", "AOUUU", "Miau", "21", "Purr", "Car"],
      isMultipleAnswer: false,
      answer : ["AOUUU"]
    }
  ];
  const handleChoiceSelect = (choice) => {
    if (selectedChoice === choice) {
      setSelectedChoice(null); // Unselect if the same choice is pressed
    } else {
      setSelectedChoice(choice); // Select the new choice
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.closeQuiz}>
          <TouchableOpacity style={{backgroundColor: "#fff", borderRadius:30}}>
            <AntDesign name="closecircle" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.quizNumber}>
            <Text style={styles.textNumber}>{quizData[currentQuestion].questionId} / {quizData[currentQuestion].totalQuestion}</Text>
        </View>
        <View style={styles.question}>
            <Text style={styles.textStyle}> {quizData[currentQuestion].question} </Text>
        </View>
      </View>
      
      <View style={styles.bottomPart}>
        <View style={styles.choice}>
          <FlatList
            data={quizData[currentQuestion].choice}
            renderItem={({ item }) => (
              <QuizChoice
                content={item}
                isSelected={selectedChoice === item}
                onPress={() => handleChoiceSelect(item)}
                makeColumn={(quizData[currentQuestion].choicecount > 4)? true : false}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Display in two columns
            columnWrapperStyle={styles.columnWrapper} // Add spacing between columns
            contentContainerStyle={styles.choiceContainer} // Style for FlatList container
          />
        </View>
        <View>
          <TouchableOpacity style={styles.nextButton}>
            <Text> Next </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '1%',
  },
  topPart:{
    height: height * 0.3,
    width: width,
    backgroundColor: "#04B36E",
  },
  bottomPart:{
    height: height * 0.7,
    width: width,
    justifyContent: "center",
  },
  closeQuiz: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end",
    marginRight: width * 0.07,
    marginTop: height * 0.07
  },
  quizNumber:{
    alignSelf: "center",
    backgroundColor: "#ddd",
    padding:7,
    paddingHorizontal:15,
    marginTop: -height * 0.2,
    marginBottom: height * 0.08,
    zIndex: 1,
  },
  question: {
    //flex: 1,
    width: width * 0.9,
    height: height * 0.25,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.02,
    marginVertical: -height * 0.1,
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    borderStyle:"solid",
  },
  textNumber:{
    fontSize: 20,
    fontWeight: "bold"
  },
  textStyle:{
    fontSize: 20,
    //fontWeight: "bold"
  },
  choice: {
    flex: 4,
    width: width * 0.9,
    padding: 10,
    marginTop: height * 0.1,
    marginBottom: height * 0.2,
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  choiceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  columnWrapper: {
    width: width * 0.9,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  nextButton:{
    paddingHorizontal: width * 0.05,
    paddingVertical:10,
    marginRight:20,
    marginVertical: -height * 0.15,
    backgroundColor: "#0270ED", 
    borderRadius:20,
    alignSelf: "flex-end",
  },
  headerText: {
    flex: 1,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
})
{
  /* <FlatList
          data={quizData[currentQuestion].choice}
          renderItem={({item})=>(
            <QuizChoice content={item}/>
          )}
          keyExtractor={(item)=>item.id}
          ListHeaderComponent={<Text style={styles.headerText}>Choice</Text>}
        /> */}