import express,{Router} from "express";
import json from "body-parser";
import {sumar,restar,PI, alumnos} from "../modules/librerias.js"


const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Se cargo la pagina");
})

router.get('/1',(req,res)=>{
    res.send("La suma de " + sumar(10,3));
})


router.get('/api/alumnos',(req,res) =>{
    res.json(alumnos);
})

router.get('/api/alumnos/:idAlumno',(req,res) =>{
    const {idAlumno} = req.params

    const alumnoid = alumnos.find(alumno => alumno.id == idAlumno);

    if (alumnoid) {
        res.json(alumnoid);
    } else {
        res.status(404).json({ error: 'Alumno no encontrado' });
    }
})



export default router;
