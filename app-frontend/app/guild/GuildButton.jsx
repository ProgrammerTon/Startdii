import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import colors from '../../constants/color';
import fonts from '../../constants/font';
import images from '../../constants/images';

const GuildButton = ({ guild, onPress }) => {
  const getImage = () => {
    switch (guild.cover) {
      case 1:
        return images.guildcover1;
      case 2:
        return images.guildcover2;
      case 3:
        return images.guildcover3;
      default:
        return images.guildcover1;
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.guildImage}
            source={getImage()}
            contentFit="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[fonts.EngBold18, styles.titleText]}>
            {guild.title}
          </Text>
          <Text style={[fonts.EngMedium14, styles.description]}>
            {guild.description}
          </Text>
          <View style={styles.memberContainer}>
            <Text style={[fonts.EngMedium14, styles.members]}>
              {guild.members} Members
            </Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default GuildButton;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: 130,
    marginTop: 15,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: 100,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  guildImage: {
    width: 130,
    height: 130,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  titleText: {
    color: colors.black,
  },
  description: {
    color: colors.gray_font,
    marginVertical: 6,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: '2%',
  },
  members: {
    color: colors.black,
  },
});
