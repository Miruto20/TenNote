import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("test.db");

// Aquí puedes definir tus operaciones y consultas SQL

export const createTables = () => {
  try {
    console.log("Creando tablas");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), content TEXT);"
      );
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Tablas creadas");
  }
};

export const insertNote = (note) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO notes(title, content) VALUES(?,?)", [
        note.title,
        note.content,
      ]);
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("table inserted");
  }
};

export const selectAllNotes = (setNotes) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, resultSet) => setNotes(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  } catch (err) {
    console.error(err.message);
  }
};
