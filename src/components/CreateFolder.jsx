import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../../styles";
import { insertFolder } from "../../database";

const CreateFolder = ({ folders, setFolders, db }) => {
  const [title, setTitle] = useState("");

  const handleFolderSubmit = () => {
    insertFolder(title, setTitle, folders, setFolders);
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
