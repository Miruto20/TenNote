import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import { deleteTables, createTables } from "./database.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./src/screens/MainScreen.jsx";
import { FolderScreen } from "./src/screens/FolderScreen.jsx";
const Stack = createNativeStackNavigator();

export default function App() {
  /* deleteTables(); */
  createTables();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "welcome" }}
        ></Stack.Screen>
        <Stack.Screen
          name="folder"
          component={FolderScreen}
          options={{ name: "folder" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
