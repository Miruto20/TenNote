import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import CreateNote from "./scr/components/CreateNote";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ten Note Gestor</Text>
      <CreateNote />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
