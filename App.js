import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ListNotes from "./src/components/ListNotes.jsx";
import CreateNote from "./src/components/CreateNote.jsx";

export default function App() {
  const test = true;
  const db = SQLite.openDatabase("ten_note.db");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([
    {
      id: "1",
      content: `EL ser humano es increíble me parece una sobrada toda esta vaina que me está contando este notas`,
      title: "Nota de prueba",
    },
    { id: "2", content: "prueba 2", title: "Nota de prueba 2" },
    { id: "3", content: "prueba 3", title: "Nota de prueba 3" },
    { id: "4", content: "prueba 4", title: "lorem" },
  ]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS notes(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title VARCHAR(20), content TEXT, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes`,
        null,
        (txObj, resultSet) => {
          setNotes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });

    setLoading(false);
  }, []);

  if (test) {
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>CARREGANDO</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListNotes notes={notes}></ListNotes>
        <CreateNote notes={notes} setNotes={setNotes}></CreateNote>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {loading && <Text>Cargando las notas</Text>}
      {!loading && (
        <View style={styles.container}>
          <TextInput
            placeholder="Título"
            onChangeText={() => {
              setCurrentTitle(currentTitle);
            }}
          >
            {currentTitle}
          </TextInput>
          <TextInput
            placeholder="¿En qué piensas?"
            onChangeText={() => {
              setCurrentContent(currentTitle);
            }}
          >
            {currentContent}
          </TextInput>
          <Button title="Guardar nota" onPress={handleSubmit}></Button>
        </View>
      )}
    </View>
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
