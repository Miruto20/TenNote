import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import ListNotes from "./src/components/ListNotes.jsx";
import CreateNote from "./src/components/CreateNote.jsx";

export default function App() {
  const test = true;
  const db = SQLite.openDatabase("ten_note.db");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = () => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO notes(title, content) VALUES(?,?)`,
        [title, content],

        (txObj, resultSet) => {
          const existingNotes = [...notes];
          existingNotes.push({
            id: resultSet.insertId,
            title: title,
            content: content,
          });
          setNotes(existingNotes);
          setContent("");
          setTitle("");
        },

        (txObj, error) => console.log(error)
      );
    });
  };

  const [notes, setNotes] = useState([]);

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
          console.log(resultSet.rows._array);
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
        <View>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Título"
          />
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="Escribe tu nota..."
            multiline
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Crear Nota</Text>
          </TouchableOpacity>
        </View>
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
