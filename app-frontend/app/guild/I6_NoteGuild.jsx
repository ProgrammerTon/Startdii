import React, { useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import SourceCard from '../../components/E1_SourceCard';
import { useGlobalContext } from '../../context/GlobalProvider.js';

const NoteGuildPage = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
        "source": {
            "_id": "66d846a70314f2930966512a",
            "ownerId": {
                "_id": "66cf16772bd720377e20a4bd",
                "username": "bestgamer01"
            },
            "title": "Lordza",
            "tags": [
                "Source",
                "Computer",
                " Program"
            ],
            "avg_rating_score": 3
        },
        "sender": "bestgamer01",
        "type": "Source",
        "time": "8:59:"
    },{
        "text": "Het",
        "sender": "bestgamer01",
        "type": "Text",
        "time": "8:33:"
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const fetchData = () => {
    // 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.filter(item => item.type === 'Source')} 
        renderItem={({ item }) => {
          const fav = user?.favorite_sources?.includes(item.source._id) || false;
          return (
            <SourceCard
              id={item.source._id}
              title={item.source.title}
              author={item.source.ownerId.username}
              tags={item.source.tags}
              isFavorite={fav}
              rating={item.source.avg_rating_score}
            />
          );
        }}
        keyExtractor={(item) => item.source._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData()}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default NoteGuildPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    padding : 20
  },
});
