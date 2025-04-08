import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";
import cors from "cors";
import { fileURLToPath } from "url";
//import misRutas from "./router/index.js";
import dataBase from "./modules/proyecto.js";
import router from "./router/indexproyecto.js";



//constantes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//generar el objeto principal
const app = express();

//configuracion
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//directorios
app.use(cors());
//app.use(misRutas);


app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);







//iniciar servidor
const puerto = 3000;
app.listen(puerto,()=>{
    console.log("iniciando el servidor");
})