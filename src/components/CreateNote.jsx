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

const CreateNote = ({}) => {
  const [contenido, setContenido] = useState("");

  const crearNota = async () => {
    //Crear la nota
    if (contenido.trim() !== "") {
      const nuevaNota = {
        id: Date.now().toString(),
        nombre:
          contenido.trim().length >= 10
            ? contenido.trim().slice(0, 10).split(" ").join("-")
            : contenido,
        contenido,
      };
      try {
        //Declarar la ruta
        const rutaNota =
          FileSystem.documentDirectory + `${nuevaNota.nombre}.txt`;
        console.log(rutaNota);
        //Comprobar si existe la nota ya.
        /*         const contenidoActual = await FileSystem.readAsStringAsync(rutaNota);
         */ //Guardar la nota en el dispositivo
        await FileSystem.writeAsStringAsync(rutaNota, nuevaNota.contenido);
        const fileUri = await FileSystem.getContentUriAsync(rutaNota);
        console.log(fileUri);

        setContenido("");
      } catch (err) {
        Alert.alert("aquí");
      }
    } else {
      Alert.alert("Error", "El contenido de la nota no puede estar vacío.");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={contenido}
        onChangeText={setContenido}
        placeholder="Escribe tu nota..."
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={crearNota}>
        <Text style={styles.buttonText}>Crear Nota</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNote;
