import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Descriptionblock from './F2.1_descriptionBlock';
import Tag from './F2.1_Tag';
import StartButton from './F2.1_StartButton';
import { TimeDateBlock } from './F2.1_Time_Username';
import { UsernameBlock } from './F2.1_Time_Username';
import CommentBox from './F2.1_CommentBlock';
import RatingBlock from './F2.1_Rating';

const FirstQuizPage = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerStyle}>Data Mining</Text>
        <Descriptionblock />
        <View style={styles.tagsContainer}>
          <Tag label="#datasci" />
          <Tag label="#datamining" />
        </View>
        <View style={styles.headerContainer}>
          <TimeDateBlock timeDate="22/07/24 18:00" />
          <UsernameBlock />
        </View>
        <Text style={styles.headerQs}>10 Questions</Text>
        <StartButton/> 
        <RatingBlock ScoreRating={4.5} numComment={2}/>
        <CommentBox 
          username="CHAOS C" 
          date="22/07/24" 
          comment="อาจารย์ชอบกวาง อยากไปล่ากวาง ที่บ้านสวนกวาง ในขณะเดินไปในท่ากวาง และมองเหลียวหลัง เลยเป็นกวางเหลียวหลัง" 
        />
        <CommentBox 
          username="BEST BELL" 
          date="22/07/24" 
          comment="รักกันดีค่ะ ไม่ต้องยุ่ง" 
        />
      </ScrollView>
    </View>
  );
};

export default FirstQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#38b560',
    padding: 20,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  tagsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 5, 
  },
  headerQs : {
    fontSize : 25 ,
    fontWeight : "bold",
    marginTop : 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : "space-between" ,
    marginBottom: 5,
  },
});
