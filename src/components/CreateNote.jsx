import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import * as FileSystem from "expo-file-system";
import styles from "../../styles";

const CreateNote = ({ prueba, setPrueba }) => {
  const handlePress = () => {
    const getPrueba = async () => {
      try {
        const res = await fetch("http://10.0.2.2:3000/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "nota",
            content: "nota anotada",
            isDir: false,
          }),
        });

        if (!res.ok) throw new Error();

        const body = await res.json();

        console.log("aqui ", body);
        setPrueba(body.message);
      } catch (error) {
        console.error(error.message);
      }
    };
    getPrueba();
  };
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Crear Nota</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNote;
