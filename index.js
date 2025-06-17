const express = require('express');
const app = express();
const usuarioRutas = require("./routes/usuario.routes");
const tareaRutas = require("./routes/tarea.routes");

const PORT = 3000;

//Para poder responder con json
app.use(express.json());
app.use('/api',usuarioRutas);
app.use('/api',tareaRutas);

app.listen(PORT,()=>{
    console.log("Corriendo en el puerto " + PORT);
});