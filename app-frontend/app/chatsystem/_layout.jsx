import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ChatLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="H3_user"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="H4_NoteUser"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="H5_QuizUser"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
