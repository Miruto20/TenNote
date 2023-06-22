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
// import { deleteTables, createTables } from "./database.js";

import ListNotes from "./src/components/ListNotes.jsx";
import ListFolders from "./src/components/ListFolders.jsx";

import CreateNote from "./src/components/CreateNote.jsx";
import CreateFolder from "./src/components/CreateFolder.jsx";

export default function App() {
  /*   deleteTables();
  createTables(); */
  const db = SQLite.openDatabase("ten_note.db");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

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
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS folders(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title VARCHAR(20),  
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM folders`,
        null,
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setFolders(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });

    setLoading(false);
  }, []);
  const [folderNotes, setFolderNotes] = useState([]);

  const openFolder = (folderId) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes WHERE folder_id = ?`,
        [folderId],
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setFolderNotes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

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
      <ListFolders folders={folders} openFolder={openFolder}></ListFolders>
      <ListNotes notes={folderNotes}></ListNotes>

      <CreateNote db={db} notes={notes} setNotes={setNotes}></CreateNote>
      <CreateFolder
        db={db}
        folders={folders}
        setFolders={setFolders}
      ></CreateFolder>
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
