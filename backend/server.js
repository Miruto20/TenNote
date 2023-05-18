const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

//Middleware para trabajar con JSON
app.use(express.json());

//endpoint de prueba
app.get("/api/data", (req, res) => {
  const data = {
    status: "ok",
    message: "Hola desde el backend!",
  };
  res.json(data);
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
