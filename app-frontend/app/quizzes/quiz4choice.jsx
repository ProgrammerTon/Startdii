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
      <View style={styles.question}>
        <Text> {quizData[currentQuestion].question} </Text>
        {quizData[currentQuestion]?.choice.map((item)=>{
          return <TouchableOpacity>
            <Text> {item} </Text>
          </TouchableOpacity>
        })}
      </View>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '1%',
  },
  question: {
    flex: 1,
    justifyContent: "center",
    padding:20,
    margin:40,
    borderRadius:5,
  },
  choice: {
    height: 120,
    flex: 2,
    padding:20,
    marginVertical:50,
    marginHorizontal:10,
    justifyContent: "space-between",
  },
  choiceContainer:{
    bordercolor: "black",
    borderwidth: 2,
    marginTop: 10,
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