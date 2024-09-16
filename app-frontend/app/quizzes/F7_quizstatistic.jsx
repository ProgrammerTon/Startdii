import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { BarChart, Grid , PieChart} from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

const QuizStatistics = ({ statistic_data = { 
    totalQuestions: 5, 
    allUsersScore: [4,1,3] ,
    allUsersAnswers: [
      [[0], ["4"], [0, 2], [1,2,4], [10]],
      [[1], ["4"], [0, 2], [1,2], [5]],
      [[0], ["2"], [1, 2], [1,2,4], [5]],
    ],
    allUsersEachQuestionScore: [
      [1,1,0,1,1],
      [0,1,0,0,0],
      [1,0,1,1,0],
    ],
    quizData: [
        {
          question: "Charay Cool or not?",
          qtype: "choice",
          choice: ["Not", "Cool"],
          answer: [0], // Correct choice is 'Cool'
        },
        {
          question: "2+2",
          qtype: "fill",
          choice: [], // No choices, since it's a fill-in question
          answer: [4], // The correct answer is 4
        },
        {
          question: "2+5 and 4+5",
          qtype: "choice",
          choice: ["0", "7", "9", "1"],
          answer: [1, 2], // Correct answers are '7' and '9'
        },
        {
          question: "2+5 and 3+2 and 1+8" ,
          qtype: "choice",
          choice: ["0", "7", "9", "1", "5"],
          answer: [1, 2, 4], // Correct answers are '7' and '9' and '5'
        },
        {
          question: "5+5",
          qtype: "fill",
          choice: [], // No choices, since it's a fill-in question
          answer: [10], // The correct answer is 4
        },
      ],
}}) => {
    
  const { totalQuestions, allUsersScore } = statistic_data;

  // Initialize a frequency object with all possible scores from 0 to totalQuestions
  const frequency = {};
  for (let i = 0; i <= totalQuestions; i++) {
    frequency[i] = 0;
  }

  // Calculate the frequency of each score in usersScore
  allUsersScore.forEach(score => {
    if (frequency.hasOwnProperty(score)) {
      frequency[score] += 1;
    }
  });

  // Convert frequency object to array of { score, count } objects for the graph
  const data = Object.keys(frequency).map(score => ({
    score: parseInt(score, 10),
    count: frequency[score],
  }));

  // Custom labels for the x-axis
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <SvgText
        key={index}
        x={x(index) + bandwidth / 2}
        y={y(value.count) - 10}
        fontSize={14}
        fill="black"
        alignmentBaseline="middle"
        textAnchor="middle"
      />
    ));

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <TouchableOpacity
          style={styles.closeQuiz}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color="blue" />
        </TouchableOpacity>
        <Text style={styles.title}>Summary</Text>
      </View>

      <ScrollView style={styles.bottomPart}>
        {/* User Count */}
        <Text style={styles.userCount}>Number of users: {allUsersScore.length}</Text>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <BarChart
            style={styles.chart}
            data={data}
            xAccessor={({ item }) => item.score}
            yAccessor={({ item }) => item.count}
            svg={{ fill: 'rgb(134, 65, 244)' }} // Bar color
            contentInset={{ top: 20, bottom: 20 }}
            spacingInner={0.3} // Space between bars
          >
            <Grid />
            <Labels />
          </BarChart>
        </View>

        {/* Total Questions */}
        <View style={styles.textContainer}>
          <Text style={styles.totalQuestionsText}>Total Questions: {totalQuestions}</Text>
        </View>
        
        {/*pie chart*/ }
      </ScrollView>
    </View>
  );
};

export default QuizStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '1%',
  },
  topPart: {
    height: height * 0.10,
    width: width,
    backgroundColor: "#04B36E",
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  bottomPart: {
    flex: 1,
    width: width,
    paddingTop: 20, 
    paddingHorizontal: 20,
  },
  closeQuiz: {
    position: 'absolute',
    left: width * 0.05,
    top: height * 0.07,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    top: height * 0.025,
  },
  title: {
    fontSize: width * 0.06,  
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: height * 0.025,
  },
  userCount: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    height: 220, // Adjust height based on the available space
    marginTop: 10, // Adds margin to push it down from the header
  },
  chart: {
    flex: 1,
    height: 200, // Adjust the height of the chart
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  totalQuestionsText: {
    fontSize: 16,
    color: 'black',
  },
});
