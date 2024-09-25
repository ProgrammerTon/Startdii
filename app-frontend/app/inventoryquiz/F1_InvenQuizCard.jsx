import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import images from "../../constants/images";
import { Image } from "expo-image";
import { router } from "expo-router";
import TagList from "../../components/TagList";
import { FontAwesome } from "@expo/vector-icons";
import { favoriteQuiz,unfavoriteQuiz } from "../../services/QuizService";
import { useGlobalContext } from "../../context/GlobalProvider";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const InvenQuizCard = ({ id, title, author, tags, rating, isFavorite }) => {
  const { user } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(isFavorite);
  //console.log(id);
  const toggleHeart = async () => {
    if (!isLiked) {
      const data = await favoriteQuiz(id, user._id);
      user?.favorite_quizzes?.push(id);
    } else {
      const data = await unfavoriteQuiz(id, user._id);
      user.favorite_quizzes = user.favorite_quizzes?.filter(
        (quizId) => quizId !== id
      );
    }
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/inventoryquiz/${id}`)}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.quizImage}
            contentFit="contain"
            source={images.quizpaper}
          />
          <Text style={styles.timestamp}>Inventory</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[fonts.EngBold18, styles.titleText]}>
            {title?.length > 18 ? `${title?.slice(0, 18)}...` : title}
          </Text>
          <Text style={styles.authorText}>By {author}</Text>
          <TagList
            tags={tags
              .slice(0, 3)
              .map((tag) => (tag.length > 8 ? `${tag.slice(0, 8)}...` : tag))}
            title={title}
            id={id}
          />
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/ArchiveSystem/SharePage",
                params: { shareid: id, type: "Quiz" },
              })
            }
          >
            <FontAwesome
              name="share"
              size={30}
              color={colors.gray_font}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvenQuizCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: 140,
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
    width: 90,
    height: "100%",
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  quizImage: {
    width: 110,
    height: 110,
    right: 3,
    top: 15,
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
    marginVertical: 2,
  },
  authorText: {
    color: colors.gray_font,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 7,
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
  },
});
