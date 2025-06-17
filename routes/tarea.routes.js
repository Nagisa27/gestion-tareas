const express = require('express');
const router =  express.Router();

const db = require('../db/connection');

//ruta para obtener todas las tareas
router.get('/tareas', async (req, res)=>{
    try {
        const result = await db.query('Select *From tarea');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({"mensaje":"Erro al obtener tarea"});
        console.log("Error: "+ error);
    }
});

//Ruta para obtener una sola tarea
router.get('/tarea/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await db.query('Select *From tarea where id = $1',[id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log("Error: "+ error);
        res.status(500).json({"mensaje":"Erro al obtener tarea"});
    }
});

//Ruta para obtener todas las tareas de un usuario
router.get('/tareas-usuario/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await db.query('Select *From tarea where id_usuario = $1',[id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("Error: "+ error);
        res.status(500).json({"mensaje":"Erro al obtener tarea"});
    }
});

//ruta para crear una tarea
router.post("/tarea",async (req,res)=>{
    const { titulo, descripcion, estado,id_usuario} =  req.body;
    try {
        const result = await db.query("Insert Into tarea (titulo, descripcion, estado, id_usuario) values ($1,$2,$3,$4) RETURNING *",[titulo, descripcion, estado,id_usuario]);
        res.status(201).json({"mensaje": result.rows[0]});
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({"mensaje":"Erro al insertar tarea"});
    }
});

//Ruta para actializar un usuario
router.put("/tarea/:id",async (req,res)=>{
    const { id } = req.params;
    const { titulo, descripcion, estado, id_usuario } =  req.body;
    try {
        const result = await 
        db.query
        ("Update tarea set titulo =$1, descripcion = $2, estado = $3, id_usuario = $4 where id=$5 Returning*",[titulo, descripcion, estado, id_usuario,id]);
        res.status(201).json({"mensaje": result.rows[0]});
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({"mensaje":"Erro al editar tarea"});
    }
});

router.delete('/tarea/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        await db.query('Delete from tarea where id = $1',[id]);
        res.status(200).json({"mensaje":"Eliminado correctamente"});
    } catch (error) {
        console.log("Error: "+ error);
        res.status(500).json({"mensaje":"Erro al obtener tarea"});
    }
});

module.exports = router;