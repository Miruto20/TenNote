import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import CreateNote from "./src/components/CreateNote";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [prueba, setPrueba] = useState("hola");

  return (
    <View style={styles.container}>
      <Text>TenNote Gestor</Text>
      <CreateNote prueba={prueba} setPrueba={setPrueba} />
      <StatusBar style="auto" />
      <Text>{prueba}</Text>
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
