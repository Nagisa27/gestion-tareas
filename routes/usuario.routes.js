const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const md5 = require('md5');

router.get('/',(req, res)=>{
    res.json({"mensaje":"Bienvenido a la API de Geestión de Tareas"});
});

//Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res)=>{
    try {
        const result = await db.query('Select *From usuario');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({"mensaje":"Erro al obtener usuarios"});
        console.log("Error: "+ error);
    }
});

//Ruta para obtener un solo usuario
router.get('/usuario/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await db.query('Select *From usuario where id = $1',[id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error: "+ error);
        res.status(500).json({"mensaje":"Erro al obtener usuario"});
    }
});

//Ruta para eliminar un usuario
router.delete('/usuario/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        await db.query('Delete from usuario where id = $1',[id]);
        res.status(200).json({"mensaje":"Eliminado correctamente"});
    } catch (error) {
        console.log("Error: "+ error);
        res.status(500).json({"mensaje":"Erro al obtener usuario"});
    }
});

//Ruta para insertar un usuario
router.post("/usuario",async (req,res)=>{
    const { nombre, email, contrasena } =  req.body;
    try {
        const contrasenaEncriptada = md5(contrasena);
        console.log(contrasenaEncriptada);
        const result = await db.query("Insert Into usuario (nombre, email, contrasena) values ($1,$2,$3) RETURNING *",[nombre, email,contrasenaEncriptada]);
        res.status(201).json({"mensaje": result.rows[0]});
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({"mensaje":"Erro al insertar usuario"});
    }
});

//Ruta para actializar un usuario
router.put("/usuario/:id",async (req,res)=>{
    const { id } = req.params;
    const { nombre, email, contrasena } =  req.body;
    try {
        const contrasenaEncriptada = md5(contrasena);
        console.log(contrasenaEncriptada);
        const result = await db.query("Update usuario set nombre =$1, email = $2, contrasena = $3 where id=$4 Returning*",[nombre, email,contrasenaEncriptada,id]);
        res.status(201).json({"mensaje": result.rows[0]});
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({"mensaje":"Erro al editar usuario"});
    }
});

module.exports = router;