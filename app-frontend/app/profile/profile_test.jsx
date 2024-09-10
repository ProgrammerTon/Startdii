import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import AuthService from "../../services/AuthService";
import { router } from "expo-router";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import GoalProcess from "../../components/GoalProcess";

export default function ProfileTest() {
    return (
        <SafeAreaView style={styles.bg}>
            <View>
                <Text>Profile</Text>
            </View>
            <View>
                <GoalProcess
                    title="ทำครบ 3 Quiz"
                    percent="80%" />
            </View>
        </SafeAreaView>
    );
}

const styles = {
    bg: {
        height: '100%',
        backgroundColor: colors.gray_bg,
    },
}