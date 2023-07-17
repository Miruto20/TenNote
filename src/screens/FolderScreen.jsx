import { View } from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import CreateNote from "../components/CreateNote";
import ListNotes from "../components/ListNotes";
import { selectNotesByFolderId } from "../../database";
export const FolderScreen = ({ navigation, route }) => {
  const db = SQLite.openDatabase("ten_note.db");

  const [notes, setNotes] = useState([]);

  const { folder } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: folder.title });
    selectNotesByFolderId(setNotes, folder.id);
  }, []);

  return (
    <View>
      {notes.length > 0 && <ListNotes notes={notes} />}
      <CreateNote
        db={db}
        notes={notes}
        setNotes={setNotes}
        folderId={folder.id}
      ></CreateNote>
    </View>
  );
};
