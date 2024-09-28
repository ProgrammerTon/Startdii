import { View } from "react-native";
import React, { useState } from "react";
import GoalProcess from "./GoalProcess";
import { getUserGoal } from "../services/LevelService";
import { useEffect } from "react";

export default function WeeklyGoals({ id }) {
  const [userGoal, setUserGoal] = useState(null);

  useEffect(() => {
    if (id) {
      loadUserGoal();
    }
  }, [id]);

  const loadUserGoal = async () => {
    const user_goal = await getUserGoal(id);
    setUserGoal(user_goal);
  };

  return (
    <View style={styles.container}>
      {userGoal?.map((goal, index) => (
        <GoalProcess
          key={index}
          title={goal.goalId.title}
          percent={`${
            goal.current_progress * goal.goalId.objective_count * 100
          }%`}
        />
      ))}
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
