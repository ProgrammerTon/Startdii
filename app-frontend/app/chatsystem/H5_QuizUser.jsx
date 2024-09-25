import React, { useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import QuizCard from '../../components/F1_QuizCard';
import { useGlobalContext } from '../../context/GlobalProvider.js';

const QuizUserPage = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      quiz: {
        _id: '66dff76625df1953474afcc7',
        ownerId: {
          _id: '66cfdd4b05b686656d0cd6ed',
          username: 'tonkung',
        },
        title: 'Test',
        tags: ['Best', 'Good', 'Nice'],
        avg_rating_score: 1,
      },
      sender: 'bestgamer01',
      type: 'Quiz',
      time: '9:02:',
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const fetchData = () => {
    // Logic to fetch more data (if needed)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.filter(item => item.type === 'Quiz')} 
        renderItem={({ item }) => {
          const fav = user?.favorite_quizzes?.includes(item.quiz._id) || false;
          return (
            <QuizCard
              id={item.quiz._id}
              title={item.quiz.title}
              author={item.quiz.ownerId.username}
              tags={item.quiz.tags}
              isFavorite={fav}
              rating={item.quiz.avg_rating_score}
            />
          );
        }}
        keyExtractor={(item) => item.quiz._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData()}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default QuizUserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    padding : 20
  },
});
