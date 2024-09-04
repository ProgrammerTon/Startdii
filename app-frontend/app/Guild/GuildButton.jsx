import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GuildButton = ({ guild, onPress }) => {
  const noti = 1;
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: guild.color }]} onPress={onPress}>
      <View style={styles.badge}>
        <View style={[styles.badgeShape, { backgroundColor: guild.badgeColor }]} />
        <View style={styles.ribbon} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{guild.title}</Text>
        <Text style={styles.description}>
          {guild.description}
        </Text>
        <Text style={styles.members}>{guild.members} Members</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>{noti}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GuildButton;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 2,
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
    color: '#000000',
  },
  notification: {
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
