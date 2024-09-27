import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/color";
import fonts from "../constants/font";
import GoalProcess from "./GoalProcess";

export default function WeeklyGoals() {
    return (
        <View style={styles.container}>
            <GoalProcess
                title={'ทำครบ 3 Quiz'}
                percent={'0%'} />
            <GoalProcess
                title={'ทำครบ 3 Quiz'}
                percent={'33%'} />
            <GoalProcess
                title={'ทำครบ 3 Quiz'}
                percent={'33%'} />
        </View>
    )
}

const styles = {
    container: {
        alignItems: 'center',
    },
}