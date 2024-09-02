import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import MemberItem from './MemberItem';  // Import the new component

const MemberScreen = () => {
  const members = [
    { id: 1, name: 'Juaz Juazzz', isAdmin: true ,isViceAdmin:false},
    { id: 2, name: 'PunInwZa007', isAdmin: false ,isViceAdmin: true},
    { id: 3, name: 'Mr.BOB', isAdmin: false ,isViceAdmin: true},
    { id: 4, name: 'rainny', isAdmin: false ,isViceAdmin: false},
    { id: 5, name: 'fortune', isAdmin: false ,isViceAdmin: false},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>MEMBER</Text>
      </View>

      <ScrollView style={styles.memberContainer}>
        {members.map(member => (
          <MemberItem 
            key={member.id} 
            name={member.name} 
            isAdmin={member.isAdmin} 
            isViceAdmin={member.isViceAdmin}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fca6cc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  memberContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
