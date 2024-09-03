import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PromoteOrKickWindow from './PromoteOrKickWindow';

const MemberItem = ({ name, isAdmin, isViceAdmin }) => {
  const [promoteOrKickWindowVisible, setPromoteOrKickWindowVisible] = useState(false);

  const openPromoteOrKickWindow = () => {
    setPromoteOrKickWindowVisible(true);
  };

  const closePromoteOrKickWindow = () => {
    setPromoteOrKickWindowVisible(false);
  };

  return (
    <View style={styles.memberItem}>
      <TouchableOpacity onPress={openPromoteOrKickWindow} style={styles.touchable}>
        <Text style={styles.memberName}>{name}</Text>
        {isAdmin && <Text style={styles.adminBadge}>👑</Text>}
        {isViceAdmin && !isAdmin && <Text style={styles.adminBadge}>⚔️</Text>}
      </TouchableOpacity>
      <PromoteOrKickWindow visible={promoteOrKickWindowVisible} onClose={closePromoteOrKickWindow} />
    </View>
  );
};

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    color: '#000',
    flex: 1, 
  },
  adminBadge: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
});
