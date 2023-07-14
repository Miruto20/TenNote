import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ListNotes from "../components/ListNotes.jsx";
import ListFolders from "../components/ListFolders.jsx";
import CreateNote from "../components/CreateNote.jsx";
import CreateFolder from "../components/CreateFolder.jsx";
import { createTables } from "../../database.js";
import * as SQLite from "expo-sqlite";

export const MainScreen = ({ navigation }) => {
  const db = SQLite.openDatabase("ten_note.db");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    createTables();
    /*    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS notes`);
    });
    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS folders`);
    }); */

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes WHERE folder_id = 0`,
        null,
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setNotes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
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
  }, []);

  const [folderNotes, setFolderNotes] = useState([]);

  const openFolder = (folder) => {
    /* db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes WHERE folder_id = ?`,
        [folderId],
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setFolderNotes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    }); */
    navigation.navigate("folder", { folder });
  };

  return (
    <View style={styles.container}>
      <ListNotes notes={notes}></ListNotes>
      <ListFolders folders={folders} openFolder={openFolder}></ListFolders>
      {/* <ListNotes notes={folderNotes}></ListNotes> */}

      <CreateNote db={db} notes={notes} setNotes={setNotes}></CreateNote>
      <CreateFolder
        db={db}
        folders={folders}
        setFolders={setFolders}
      ></CreateFolder>
    </View>
  );
};
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
