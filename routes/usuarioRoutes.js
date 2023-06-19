import express from "express";

const router = express.Router();

import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioControllers.js";
//Importar autentificador
import checkAuth from "../middleware/checkAuth.js";


//Creación registro y confirmación de usuarios
//AREA PÚBLICA:
    //Crea un nuevo usuario:
router.post('/', registrar);
    //Crea una nueva ruta:
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
    //Resetear password:
router.post('/olvide-password', olvidePassword);
    //Definir un nuevo password:
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);  

//Comprobamos que todos los datos esten bien en checkAuth y entonces el usuario podrá acceder al perfil:
router.get('/perfil', checkAuth, perfil);


export default router;