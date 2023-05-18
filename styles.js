import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notasContainer: {
    marginTop: 16,
  },
  notaContainer: {
    backgroundColor: "#d2fddc",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row", // Añadido para alinear el texto y el botón
    justifyContent: "space-between", // Añadido para separar el texto y el botón
    alignItems: "center", // Añadido para centrar verticalmente el contenido
  },
  notaText: {
    fontSize: 16,
  },
  carpetaContainer: {
    backgroundColor: "#f3c13a",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row", // Añadido para alinear el texto y el botón
    justifyContent: "space-between", // Añadido para separar el texto y el botón
    alignItems: "center", // Añadido para centrar verticalmente el contenido
  },
  deleteItem: {
    marginLeft: 8, // Espacio izquierdo para separar del borde
    padding: 4, // Espacio interno para resaltar visualmente
  },
});

export default styles;
