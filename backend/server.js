const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ddbb = require("./ddbb/notes.json");
const { writeFile } = require("node:fs/promises");
const { log } = require("node:console");

const app = express();
const PORT = 3000;

// Middleware que permite conectar el backend con el frontend (evita problemas
// con las CORS).
app.use(cors());

//Middleware para trabajar con JSON
app.use(express.json());

//endpoint de prueba
app.get("/test", (req, res) => {
  console.log(ddbb);
  res.send({
    status: "ok",
    message: ddbb.root,
  });
});

app.post("/test/", async (req, res) => {
  const { name, content, isDir } = req.body;
  console.log(req.body);
  const note = { id: Date.now().toString, isDir, name, content };
  ddbb[0].content.push(note);

  try {
    await writeFile(
      "./backend/ddbb/notes.json",
      JSON.stringify([...ddbb], null, 2)
    );
    res.send({
      status: "ok",
      message: "Nota creada y guardada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Error al guardar la nota",
    });
  }
});
app.use(morgan("dev"));

//Middelware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

//Middelware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
