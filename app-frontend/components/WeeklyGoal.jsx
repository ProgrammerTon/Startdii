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
import { getUserGoal } from "../services/LevelService";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

export default function WeeklyGoals() {
    const { user } = useGlobalContext();
    const [ userGoal, setUserGoal ] = useState(null);

    useEffect(() => {
    if (user) {
        loadUserGoal();
    }
    }, [user]);

    const loadUserGoal = async () => {
        const user_goal = await getUserGoal(user._id);
        setUserGoal(user_goal);
    };

    return (
        <View style={styles.container}>
            {userGoal?.map((goal, index) => (
                <GoalProcess
                    key={index}
                    title={goal.goalId.title}
                    percent={`${goal.current_progress * goal.goalId.objective_count * 100}%`}
                />
            ))}
        </View>
    )
}

const styles = {
    container: {
        alignItems: 'center',
    },
}

/* <GoalProcess
        title={userGoal[0].title}
        percent={'33%'} />
    <GoalProcess
        title={userGoal[1].title}
        percent={'33%'} />
    <GoalProcess
        title={userGoal[2].title}
        percent={'33%'} /> */