import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import TagList from "./TagList";
import { FontAwesome } from "@expo/vector-icons";
import images from "../constants/images";
import colors from "../constants/color";
import fonts from "../constants/font";
import {
  favoriteSource,
  unfavoriteSource,
  getFavoriteSource,
} from "../services/SourceService";
import { useGlobalContext } from "../context/GlobalProvider";

const SourceCard = ({ id, title, author, tags, rating, isFavorite }) => {
  const { user } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(isFavorite);

  const toggleHeart = async () => {
    if (!isLiked) {
      const data = await favoriteSource(id, user._id);
      user?.favorite_sources?.push(id);
    } else {
      await unfavoriteSource(id, user._id);
      user.favorite_sources = user.favorite_sources?.filter(
        (sourceId) => sourceId !== id
      );
    }
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/sources/${id}`)}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.bookImage}
            source={images.book}
            contentFit="contain"
          />
          <Text style={styles.timestamp}>1 day ago</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[fonts.EngBold18, styles.titleText]}>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</Text>
          <Text style={[fonts.EngMedium14, styles.authorText]}>By {author}</Text>
          <TagList tags={tags} title={title} id={id} />
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < rating ? "star" : "star-o"}
                size={20}
                color={colors.yellow}
              />
            ))}
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleHeart}>
            <FontAwesome
              name={isLiked ? "heart" : "heart-o"}
              size={30}
              color={isLiked ? colors.red : colors.gray_button}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="share"
              size={30}
              color={colors.gray_font}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SourceCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: "87%",
    height: 140,
    marginTop: 13,
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
    width: 90,
    height: "100%",
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  bookImage: {
    width: 85,
    height: 85,
    right: 8,
  },
  timestamp: {
    position: "absolute",
    bottom: 8,
    fontSize: 12,
    color: colors.gray_font,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  titleText: {
    color: colors.black,
    marginVertical: 3,
  },
  authorText: {
    color: colors.gray_font,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 5,
    gap: 4,
  },
  iconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  shareIcon: {
    marginVertical: 5,
    color: colors.gray_font,
  },
  heartIcon: {
    marginVertical: 5,
    color: colors.gray_button,
  },
});
