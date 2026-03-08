import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#151718" },
        }}
      />
      <StatusBar style="light" backgroundColor="#151718" />
    </>
  );
}
