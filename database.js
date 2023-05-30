import * as SQLite from "expo-sqlite";

// Crea una base de datos en el dispositivo, o la abre si ya existiese.
export const db = SQLite.openDatabase("ten_note.db");

//---Consultas----//

// Crear tablas
export const createTables = () => {
  try {
    console.log("Creando tablas");
    db.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS notes(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title VARCHAR(20), content TEXT, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
      );
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Tablas creadas");
  }
};

// Borrar tablas.
export const deleteTables = () => {
  try {
    console.log("Borrando tablas");
    db.transaction((transaction) => {
      transaction.executeSql(`DELETE TABLE IF EXISTS notes;`);
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Tablas borradas");
  }
};

// Insertar Notas
export const insertNote = (note) => {
  try {
    // Comprueba si la nota está vacía.
    if (!note.content) throw new error("No puedes generar notas vacías.");

    // Comprueba si la nota tiene título y si no le genera uno en base al contenido.
    if (note.title.trim() === "") {
      if (note.content.length >= 20) {
        note.title = note.content.substring(0, 17) + "...";
      } else {
        note.title = note.content;
      }
    }
    // Inserta la nota en la base de datos.
    db.transaction((transaction) => {
      transaction.executeSql(`INSERT INTO notes(title, content) VALUES(?,?)`, [
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
// Selecciona todas las notas.
export const selectAllNotes = (setNotes) => {
  try {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM notes",
        null,
        (transactionObj, resultSet) => setNotes(resultSet.rows._array),
        (transactionObj, error) => console.log(error)
      );
    });
  } catch (err) {
    console.error(err.message);
  }
};
