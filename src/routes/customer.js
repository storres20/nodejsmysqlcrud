const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

// aqui vamos a colocar todas las rutas del Servidor. CUARTO. aqui listamos todas las URL que nuestra aplicacion del Frontend puede enviarnos.
// Nota: cada URL tiene una funcion que esta escrita dentro de UN controlador que esta escrito en un archivo por separado. Para tener mas orden

router.get('/', customerController.list);

//funcion NEW -- para nueva pagina para llenar formulario
router.get('/add', customerController.new);
// le vamos a decir al "servidor" que escuche por medio del METODO POST la ruta "/add" y que ejecute una "funcion"
router.post('/add', customerController.save);

//DELETE
router.get('/delete/:id',customerController.del);
// ROUTER cuando te piden por medio del metodo GET un /delete, vas a ejecutar la funcion customerController.delete
router.post('/delete/:id', customerController.delete);

// ruta para UPDATE
router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);



module.exports = router;