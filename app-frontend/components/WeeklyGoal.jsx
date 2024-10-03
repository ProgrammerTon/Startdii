import { View } from "react-native";
import React, { useState } from "react";
import GoalProcess from "./GoalProcess";

export default function WeeklyGoals({ userGoal }) {
  return (
    <View style={styles.container}>
      {userGoal?.map((goal, index) => {
        return (
          <GoalProcess
            key={index}
            title={goal.goalId.title}
            percent={`${Math.round(
              (goal.current_progress / goal.goalId.objective_count) * 100
            )}%`}
          />
        );
      })}
    </View>
  );
}

const styles = {
  container: {
    alignItems: "center",
  },
};

/* <GoalProcess
        title={userGoal[0].title}
        percent={'33%'} />
    <GoalProcess
        title={userGoal[1].title}
        percent={'33%'} />
    <GoalProcess
        title={userGoal[2].title}
        percent={'33%'} /> */
