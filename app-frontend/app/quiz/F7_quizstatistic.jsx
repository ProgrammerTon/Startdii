import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import PieChartQuestion from "../quizzes/PieChartQuestion"; // Import the PieChartQuestion component
import { Text as SvgText } from "react-native-svg";
import { YAxis, XAxis } from "react-native-svg-charts";
import { useQuestionContext } from "../../context/QuestionProvider";
import { findQuiz } from "../../services/QuizService";

const { width, height } = Dimensions.get("window");

const QuizStatistics = () => {
  const { quizId, questions } = useQuestionContext();
  const [quizData, setQuizData] = useState([]);
  const [allUsersScore, setAllUsersScore] = useState([]);
  const [allUsersEachQuestionScore, setAllUsersEachQuestionScore] = useState(
    []
  );

  const renderLegend = () => {
    return (
      <>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: "#32cd32" }]} />
          <Text style={styles.legendText}>Correct</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: "#ff6347" }]} />
          <Text style={styles.legendText}>Incorrect</Text>
        </View>
      </>
    );
  };

  // Render pie charts for each question
  const renderPieCharts = () => {
    return quizData.map((questionData, index) => {
      return (
        <PieChartQuestion
          key={index}
          questionData={questionData}
          usercorrect={allUsersEachQuestionScore[index]}
          userwrong={
            allUsersScore.length - allUsersEachQuestionScore[index] >= 0
              ? allUsersScore.length - allUsersEachQuestionScore[index]
              : 0
          }
        />
      );
    });
  };

  // Initialize a frequency object with all possible scores from 0 to totalQuestions
  const frequency = {};
  for (let i = 0; i <= quizData.length; i++) {
    frequency[i] = 0;
  }

  // Calculate the frequency of each score in usersScore
  allUsersScore.forEach((score) => {
    if (frequency.hasOwnProperty(score)) {
      frequency[score] += 1;
    }
  });

  // Convert frequency object to array of { score, count } objects for the bar chart
  const data = Object.keys(frequency).map((score) => ({
    score: parseInt(score, 10),
    count: frequency[score],
  }));

  const fetchQuiz = async () => {
    const data = await findQuiz(quizId);
    if (!data) {
      return null;
    }
    console.log("Quiz", data);
    setAllUsersScore(data.playing_scores);
    const transformCorrect = data.questions.map((question) => question.correct);
    setAllUsersEachQuestionScore(transformCorrect);
  };

  // Custom labels for the bar chart
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

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
    console.log(quizId);
  }, [quizId]);

  useEffect(() => {
    if (questions?.length !== 0) {
      setQuizData(questions);
    }
  }, [questions]);

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

      <ScrollView
        style={styles.bottomPart}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* User Count */}
        <Text style={styles.userCount}>
          Number of users: {allUsersScore.length}
        </Text>

        {/* Bar Chart */}
        <View style={{ flexDirection: "row", height: 220, marginBottom: 20 }}>
          <YAxis
            data={data}
            yAccessor={({ item }) => item.count}
            contentInset={{ top: 20, bottom: 20 }}
            min={0}
            max={Math.max(...data.map((d) => d.count))}
            numberOfTicks={2} // Show top and bottom ticks
            formatLabel={(value) => Math.round(value)} // Round values
            style={{ marginTop: -5 }} // Space between YAxis and BarChart
          />
          <View style={{ flex: 1 }}>
            <BarChart
              style={styles.chart}
              data={data}
              xAccessor={({ item }) => item.score}
              yAccessor={({ item }) => item.count}
              svg={{ fill: "rgb(134, 65, 244)" }} // Bar color
              contentInset={{ top: 20, bottom: 20 }} // Match with YAxis
              spacingInner={0.3} // Space between bars
              yMax={Math.max(...data.map((d) => d.count))} // Set max value for y-axis
            >
              <Grid />
              <Labels />
            </BarChart>
            <XAxis
              data={data}
              contentInset={{ left: 10, right: 10 }} // Spacing
              svg={{ fontSize: 10, fill: "black" }} // Label styling
            />
          </View>
        </View>

        {renderLegend()}
        {/* Render Pie Charts */}
        {renderPieCharts()}
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
    marginHorizontal: "1%",
  },
  topPart: {
    height: height * 0.1,
    width: width,
    backgroundColor: "#04B36E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomPart: {
    flex: 1,
    width: width,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  closeQuiz: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    top: height * 0.025,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: height * 0.025,
  },
  userCount: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  chartContainer: {
    height: 220, // Height of the bar chart
    marginBottom: 20, // Space between bar chart and pie charts
  },
  chart: {
    flex: 1,
    height: 200, // Adjust the height of the bar chart
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: "column", // Changed from 'row' to 'column' for vertical layout
    justifyContent: "flex-start", // Align legend items to the top
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Add margin between legend items
    marginRight: 30,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});
