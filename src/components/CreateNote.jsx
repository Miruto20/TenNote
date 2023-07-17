import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "../../styles";
import { insertNote } from "../../database";

const CreateNote = ({ notes, setNotes, db, folderId }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    let note = { content, title, folderId };

    insertNote(note, notes, setNotes);
    setContent("");
    setTitle("");
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
