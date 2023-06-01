import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Note = ({ note }) => {
  const { content, title } = note;
  return (
    <View style={styles.note}>
      <Text style={styles.text1}>{title}</Text>
      <Text style={styles.text2}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
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

export default Note;
