import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Note from "./Note";
const ListNotes = ({ notes }) => {
  return (
    <View style={styles.notesContainer}>
      {notes.map((note) => {
        const { id } = note;
        return (
          <Text style={styles.li} key={id}>
            <Note note={note}></Note>
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  notesContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  li: { margin: 10 },
});

export default ListNotes;
