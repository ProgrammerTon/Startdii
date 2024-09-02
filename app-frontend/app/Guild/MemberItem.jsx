import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MemberItem = ({ name, isAdmin }) => {
  return (
    <View style={styles.memberItem}>
      <Text style={styles.memberName}>{name}</Text>
      {isAdmin && <Text style={styles.adminBadge}>👑</Text>}
    </View>
  );
};

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  memberName: {
    fontSize: 16,
    color: '#000',
  },
  adminBadge: {
    fontSize: 16,
    color: '#000',
  },
});
