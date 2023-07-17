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
        `CREATE TABLE IF NOT EXISTS folders(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title VARCHAR(20),  
          folder_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (folder_id) REFERENCES folders (id)
          )
          `
      );
    });
    db.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS notes(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title VARCHAR(20), content TEXT, 
          folder_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (folder_id) REFERENCES folders (id));`
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
      transaction.executeSql(`DROP TABLE IF EXISTS notes;`);
      transaction.executeSql(`DROP TABLE IF EXISTS folders;`);
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log("Tablas borradas");
  }
};

// Inserta Notas y actualiza el estado.
export const insertNote = (note, notes, setNotes) => {
  db.transaction((transaction) => {
    let { folderId, title, content } = note;

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
      },

      (txObj, error) => console.log(error)
    );
  });
};
// Selecciona todas las notas.
export const selectAllNotes = (setNotes) => {
  try {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM notes",
        // Aquí irían los campos en caso de ser un insert statement.
        null,
        // Callback de éxito que nos cambia el estado de las notas.
        (transactionObj, resultSet) => {
          console.log("el pepe ", resultSet.rows._array);
          setNotes([...resultSet.rows._array]);
        },
        // Callback de error
        (transactionObj, error) => console.log(error)
      );
    });
  } catch (err) {
    console.error(err.message);
  }
};
// Inserta carpetas y actualiza el estado.
export const insertFolder = (title, setTitle, folders, setFolders) => {
  db.transaction((transaction) => {
    transaction.executeSql(
      `INSERT INTO folders (title) VALUES(?)`,
      [title],

      (txObj, resultSet) => {
        const existingFolders = [...folders];
        existingFolders.push({
          id: resultSet.insertId,
          title: title,
          createdAt: new Date(),
        });
        setFolders(existingFolders);
        setTitle("");
      },

      (txObj, error) => console.log(error)
    );
  });
};
