import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal
} from "react-native";
import { React , useState } from "react";
import QuizChoice from "../../components/QuizChoice";
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default function Quiz1_4sol() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState([]);
  const [closeQuiz, setCloseQuiz] = useState(false);
  const quizData = [
    {
      totalQuestion: 5,
      questionId: 1,
      question: "What does the cat says?",
      choicecount: 4,
      choice: ["Meaw", "AOUUU", "Miau", "21"],
      isMultipleAnswer: true,
      selectedChoice: ["Meaw","21"],
      answer : ["AOUUU","21"]
    }
  ];
  const checkingSelected = (item) => {
    return quizData[currentQuestion].selectedChoice.includes(item)
  }
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.closeQuiz}>
          <TouchableOpacity style={{backgroundColor: "#fff", borderRadius:30}} onPress={()=>setCloseQuiz(true)}>
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
        
        {quizData[currentQuestion]?.choice.map((item, index)=>{
          return <QuizChoice
                  key={index}
                  content={item}
                  isSelected={checkingSelected(item)}
                  onPress={() => (null)}
                  isCorrect={quizData[currentQuestion].answer.includes(item)}
                  isMultipleAnswer={quizData[currentQuestion].isMultipleAnswer}
                  isSolution={quizData[currentQuestion].selectedChoice.length !== 0}
                  />
          })}
        </View>
        <View>
          <TouchableOpacity style={styles.nextButton} onPress={() => console.log(selectedChoice)}>
            <Text style={{fontSize: 16, color: "#fff"}}> Next </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent={true} visible={closeQuiz}>
        <View style={{flex: 1, backgroundColor: "#555555aa"}}>
          <View style={{backgroundColor: "#fff", marginTop: height*0.4, margin:50, padding: 20, alignItems: "center", borderRadius: 10, height: height * 0.15}}>
            <View>
              <Text style={{fontSize: 20, fontWeight: "bold"}}> Do you want to Leave Quiz? </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <TouchableOpacity style={styles.closeQuizButton} onPress={()=>setCloseQuiz(false)}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leaveQuizButton}>
                <Text style={{fontSize: 16, fontWeight: "bold", color: "#fff"}}> Leave </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  closeQuizButton:{
    paddingHorizontal: width * 0.05,
    paddingVertical:10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#bbb",
    paddingHorizontal: width * 0.05,
    borderRadius:20,
  },
  leaveQuizButton:{
    paddingHorizontal: width * 0.05,
    paddingVertical:10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#F44D19",
    paddingHorizontal: width * 0.05,
    borderRadius:20,
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