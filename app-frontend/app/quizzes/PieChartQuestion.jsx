import React from 'react';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
const { width, height } = Dimensions.get('window');

const PieChartQuestion = ({ questionData, allUsersAnswers, allUsersScore }) => {
  const colors = ['#4CAF50', '#FFC107', '#FF5722', '#03A9F4', '#9C27B0', '#000000']; // Colors for choices

  // Function to calculate frequency for choice questions
  const calculateChoiceFrequency = (answers, choices) => {
    const frequency = new Array(choices.length).fill(0);
    answers.forEach(userAnswer => {
      userAnswer.forEach(choiceIndex => {
        frequency[choiceIndex]++;
      });
    });
    return frequency.map((count, index) => ({
      key: choices[index],
      value: count,
      svg: { fill: colors[index % colors.length] },
      arc: { outerRadius: '100%', padAngle: 0.03 },
      labelCentroid: ({ centroid }) => [centroid[0], centroid[1]],
      label: ({ value }) => `${((value / allUsersAnswers.length) * 100).toFixed(0)}%`,
    }));
  };

  // Function to prepare score data for fill type questions
  const calculateScoreRatio = (scores) => {
    const scoreData = [
      { key: '0', value: scores.filter(score => score === 0).length, svg: { fill: '#ff6347' } },
      { key: '1', value: scores.filter(score => score === 1).length, svg: { fill: '#32cd32' } },
    ];
    return scoreData;
  };

  const renderPieChart = () => {
    if (questionData.qtype === 'choice') {
      const choiceData = calculateChoiceFrequency(allUsersAnswers, questionData.choice);
      return <PieChart style={{ height: 200 }} data={choiceData} />;
    } else if (questionData.qtype === 'fill') {
      const scoreData = calculateScoreRatio(allUsersScore);
      return <PieChart style={{ height: 200 }} data={scoreData} />;
    }
  };

  // Render the legend for the pie chart
  const renderLegend = () => {
    if (questionData.qtype === 'choice') {
      return questionData.choice.map((choice, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: colors[index % colors.length] }]} />
          <Text style={styles.legendText}>{choice}</Text>
        </View>
      ));
    } else if (questionData.qtype === 'fill') {
      return (
        <>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#32cd32' }]} />
            <Text style={styles.legendText}>Correct (1)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#ff6347' }]} />
            <Text style={styles.legendText}>Incorrect (0)</Text>
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questionData.question}</Text>
      {renderPieChart()}
      <View style={styles.legendContainer}>
        {renderLegend()}
      </View>
    </View>
  );
};

export default PieChartQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'column',  // Changed from 'row' to 'column' for vertical layout
    justifyContent: 'flex-start',  // Align legend items to the top
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,  // Add margin between legend items
    marginRight: 30
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
