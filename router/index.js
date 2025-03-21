import express,{Router} from "express";
import json from "body-parser";
import {sumar,restar,PI,data} from "../modules/librerias.js"

export const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Se cargo la pagina");
})

router.get('/1',(req,res)=>{
    res.send("La suma de " + sumar(10,3));
})

router.get('/2',(req,res)=>{
    res.send("El alumno es: " + data.nombre);
})



export default router;
