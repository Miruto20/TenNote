import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../../styles";

const CreateNote = ({ notes, setNotes, db, folderId }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    db.transaction((transaction) => {
      if (!folderId) {
        folderId = 0;
      }
      transaction.executeSql(
        `INSERT INTO notes(title, content, folder_id) VALUES(?,?,?)`,
        [title, content, folderId],

        (txObj, resultSet) => {
          const existingNotes = [...notes];
          existingNotes.push({
            id: resultSet.insertId,
            title: title,
            content: content,
            folderId: folderId,
            createdAt: new Date(),
          });
          setNotes(existingNotes);
          setContent("");
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
  );
};

export default CreateNote;
