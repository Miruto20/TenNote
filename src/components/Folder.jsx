import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Folder = ({ folder }) => {
  const { title } = folder;
  return (
    <View style={styles.folder}>
      <Text style={styles.text1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  folder: {
    flex: 1,
    backgroundColor: "lightgrey",
    minWidth: 100,
    maxWidth: 100,
    borderRadius: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  text1: { padding: 2, fontWeight: 800 },
  text2: { padding: 5 },
});

export default Folder;
