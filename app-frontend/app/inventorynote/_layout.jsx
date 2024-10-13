import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function InvenNoteLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="C1_EditNotePage"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
