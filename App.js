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
import { deleteTables, createTables } from "./database.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./src/screens/MainScreen.jsx";
import { FolderScreen } from "./src/screens/FolderScreen.jsx";
const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase("ten_note.db");
export default function App() {
  //deleteTables();
  createTables();
  /*   const db = SQLite.openDatabase("ten_note.db");
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

 */

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "welcome" }}
        ></Stack.Screen>
        <Stack.Screen
          name="folder"
          component={FolderScreen}
          options={{ name: "folder" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
