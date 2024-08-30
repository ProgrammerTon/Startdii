import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { React , useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizChoice from "../../components/QuizChoice";
import Button from "../../components/Button";
import CommentList from "../../components/CommentCard";
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default function Quiz4choice() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const quizData = [
    {
      totalQuestion: 5,
      questionId: 1,
      question: "What does the cat says? askldksAGFJDSKLJFKJSDFJKerdfstgyhujgihfhudgytfrsdewfyguhijotfrdeswfg",
      choicecount: 4,
      choice: ["Meaw", "AOUUU", "Miau", "Nyan"],
      isMultipleAnswer: false,
      answer : ["AOUUU"]
    }
  ]
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
        {quizData[currentQuestion]?.choice.map((item)=>{
          return <QuizChoice content={item} />
          })}
        </View>
        <View style={styles.nextQuestion}>
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
    height: height * 0.25,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.02,
    marginVertical: -height * 0.1,
    marginHorizontal: width * 0.1,
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
    width: width * 0.8,
    padding: 10,
    marginTop: height * 0.15,
    marginBottom: height * 0.2,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  nextQuestion:{
    flex: 1,

  },
  nextButton:{
    paddingHorizontal: width * 0.05,
    paddingVertical:10,
    marginRight:20,
    marginVertical: -height * 0.05,
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