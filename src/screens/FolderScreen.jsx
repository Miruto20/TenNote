import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import CreateNote from "../components/CreateNote";
import ListNotes from "../components/ListNotes";
export const FolderScreen = ({ navigation, route }) => {
  const db = SQLite.openDatabase("ten_note.db");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM notes WHERE folder_id = ?`,
        [route.params.folderId],
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setNotes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });
  }, []);

  return (
    <View>
      <ListNotes notes={notes} />
      <CreateNote
        db={db}
        notes={notes}
        setNotes={setNotes}
        folderId={route.params.folderId}
      ></CreateNote>
    </View>
  );
};
