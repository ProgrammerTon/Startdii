import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import TagList from "./TagList";
import { FontAwesome } from "@expo/vector-icons"; // Importing icons for heart and stars
import images from "../constants/images";

const SourceCard = ({ id, title, author, tags, rating }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = () => {
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
        <Text style={styles.titleText}>
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </Text>
          <Text style={styles.authorText}>By {author}</Text>
          <TagList tags={tags} title={title} id={id} />
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < rating ? "star" : "star-o"}
                size={16}
                color="#FEDD3A"
              />
            ))}
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleHeart}>
            <FontAwesome
              name={isLiked ? "heart" : "heart-o"}
              size={20}
              color={isLiked ? "red" : "gray"}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="share"
              size={20}
              color="gray"
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
    width: "100%",
    height: 120,
    marginTop: 13,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    width: 75,
    height: "100%",
    backgroundColor: "#FEDD3A",
    justifyContent: "center",
    alignItems: "center",
  },
  bookImage: {
    width: 50,
    height: 50,
  },
  timestamp: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontSize: 12,
    color: "#888888",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  authorText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  shareIcon: {
    marginVertical: 5,
  },
  heartIcon: {
    marginVertical: 5,
  },
});
