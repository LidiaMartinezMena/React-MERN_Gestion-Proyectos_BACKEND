import express from "express"
import dotenv from "dotenv";
import conectarDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from 'cors'


const app = express();
//Para que pueda leer los JSON
app.use(express.json());

dotenv.config();

conectarDB();

//Configurar CORS. whiteList: la lista de las página que sí pueden acceder al proyecto

const whitelist = [process.env.FRONTEND_URL];

//origin: desde donde se realiza la petición:
const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //Sí puede consultar la API
            callback(null, true);
        }else{
            //No se permite
            callback(new Error("Error de Cors"));
        }
    },
};
app.use(cors(corsOptions));

//Routing

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

//VARIABLE ENTORNO PARA EL PUERTO:

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
} );