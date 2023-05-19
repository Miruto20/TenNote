const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware que permite conectar el backend con el frontend (evita problemas
// con las CORS).
app.use(cors());

//Middleware para trabajar con JSON
app.use(express.json());

//endpoint de prueba
app.get("/test", (req, res) => {
  res.send({
    status: "ok",
    message: "Hola desde el backend!",
  });
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
