import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { db, createTables, selectAllNotes, insertNote } from "./database";
import { StatusBar } from "expo-status-bar";
import CreateNote from "./src/components/CreateNote";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const testNote = { title: "Prueba", content: "Esto es otra nota de prueba" };

  useEffect(() => {
    /*     createTables();
    insertNote(testNote); */

    try {
      selectAllNotes(setNotes);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
    console.log("aquí ", notes);
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Text>Cargando las notas</Text>}
      {!loading && (
        <View>
          {notes.map((note) => {
            <Text>
              <View>
                <Text>{note.title}</Text>
                <Text>{note.content}</Text>
              </View>
            </Text>;
          })}
        </View>
      )}
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
