import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PromoteOrKickWindow from "./PromoteOrKickWindow";
import colors from "../../constants/color";

const MemberItem = ({
  userId,
  name,
  isAdmin,
  isViceAdmin,
  mainKick,
  mainPromote,
}) => {
  const [promoteOrKickWindowVisible, setPromoteOrKickWindowVisible] =
    useState(false);

  const openPromoteOrKickWindow = () => {
    setPromoteOrKickWindowVisible(true);
  };

  const closePromoteOrKickWindow = () => {
    setPromoteOrKickWindowVisible(false);
  };

  return (
    <View style={styles.memberItem}>
      <TouchableOpacity
        onPress={openPromoteOrKickWindow}
        style={styles.touchable}
      >
        <Text style={styles.memberName}>{name}</Text>
        {isAdmin && <Text style={styles.adminBadge}>👑</Text>}
        {isViceAdmin && !isAdmin && <Text style={styles.adminBadge}>⚔️</Text>}
      </TouchableOpacity>
      <PromoteOrKickWindow
        userId={userId}
        visible={promoteOrKickWindowVisible}
        onClose={closePromoteOrKickWindow}
        handlePromote={mainPromote}
        handleKick={mainKick}
      />
    </View>
  );
};

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  adminBadge: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 5,
  },
});
