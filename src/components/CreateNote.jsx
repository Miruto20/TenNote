import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import styles from "../../styles";

const CreateNote = ({ notes, setNotes }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = () => {
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
