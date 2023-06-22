import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../../styles";

const CreateFolder = ({ folders, setFolders, db }) => {
  const [title, setTitle] = useState("");

  const handleFolderSubmit = () => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO folders (title) VALUES(?)`,
        [title],

        (txObj, resultSet) => {
          const existingFolders = [...folders];
          existingFolders.push({
            id: resultSet.insertId,
            title: title,
            createdAt: new Date(),
          });
          setFolders(existingFolders);
          setTitle("");
        },

        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />

      <TouchableOpacity onPress={handleFolderSubmit}>
        <Text>Crear Carpeta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateFolder;
