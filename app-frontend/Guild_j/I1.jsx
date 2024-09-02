import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const ArchiveMainPage = () => {
  const guilds = [
    { id: 1, color: '#FF6347', badgeColor: '#2ecc71', title: 'เรารู้เขารู้เรา', members: 12 },
    { id: 2, color: '#4682B4', badgeColor: '#FF69B4', title: 'เรารู้เขารู้เรา', members: 12 },
    { id: 3, color: '#FFB6C1', badgeColor: '#FF4500', title: 'เรารู้เขารู้เรา', members: 12 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Guild</Text>
      </View>

      {guilds.map(guild => (
        <View key={guild.id} style={[styles.card, { backgroundColor: guild.color }]}>
          <View style={styles.badge}>
            <View style={[styles.badgeShape, { backgroundColor: guild.badgeColor }]} />
            <View style={styles.ribbon} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{guild.title}</Text>
            <Text style={styles.description}>เรารู้เขา เรารู้ว่าคนชื่นชอบแล้วหรือถ้า I know you you know me by Movie, Anime or Game เขาเปาใส่ระนะเรารู้ว่าเขาใส่เรา เรารู้ว่า ด้วยหนังหรือเกม</Text>
            <Text style={styles.members}>{guild.members} Members</Text>
          </View>
          <View style={styles.notification}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArchiveMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    backgroundColor: '#FFB6C1',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 2, // for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  badge: {
    width: 50,
    height: 50,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeShape: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  ribbon: {
    width: 10,
    height: 20,
    backgroundColor: '#ffcc00',
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  members: {
    fontSize: 12,
    color: '#888',
  },
  notification: {
    backgroundColor: '#FF6347',
    borderRadius: 15,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: '#FF6347',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5, // for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
