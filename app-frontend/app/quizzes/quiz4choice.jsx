import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { React , useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizChoice from "../../components/QuizChoice";
import Button from "../../components/Button";
import CommentList from "../../components/CommentCard";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Quiz4choice() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const quizData = [
    {
      questionId: 1,
      question: "What does the cat says?",
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
          <TouchableOpacity style={{backgroundColor: "#fff", borderRadius:30, marginRight:25}}>
            <AntDesign name="closecircle" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.question}>
          <Text style={styles.textStyle}> {quizData[currentQuestion].question} </Text>
        </View>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.choice}>
        {quizData[currentQuestion]?.choice.map((item)=>{
          return <TouchableOpacity>
              <View style={styles.choiceContainer}>
                <Text style={styles.textStyle}> {item} </Text>
              </View>
            </TouchableOpacity>
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
    flex: 1,
    width: "105%",
    backgroundColor: "#04B36E",
  },
  bottomPart:{
    flex: 2,
    width: "105%",
    justifyContent: "center",
  },
  closeQuiz: {
    flex: 1,
    flexDirection: "column",
    display: "flex", 
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  question: {
    flex: 2,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
    marginVertical: 20,
    borderRadius:10,
    borderWidth:2,
    borderColor:"black",
    borderStyle:"solid",
  },
  textStyle:{
    fontSize: 20,
    //fontWeight: "bold"
  },
  choice: {
    flex: 4,
    width: "80%",
    padding:20,
    marginVertical:30,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  choiceContainer:{
    backgroundColor:"lightblue",
    paddingVertical: 20,
    marginTop:10,
    borderWidth:2,
    borderColor:"black",
    borderStyle:"solid",
    borderRadius:5,
    flexDirection:"row",
    justifyContent:"center",
  },
  nextQuestion:{
    flex: 1,
  },
  nextButton:{
    paddingHorizontal:20,
    paddingVertical:10,
    marginRight:20,
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