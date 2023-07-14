import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Folder from "./Folder";
const ListFolders = ({ folders, openFolder }) => {
  return (
    <View style={styles.folderContainer}>
      {folders.map((folder) => (
        <TouchableOpacity key={folder.id} onPress={() => openFolder(folder)}>
          <Text style={styles.li} key={folder.id}>
            <Folder folder={folder}></Folder>
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  folderContainer: {
    display: "flex",
    height: "auto",
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  li: { margin: 10 },
});

export default ListFolders;
