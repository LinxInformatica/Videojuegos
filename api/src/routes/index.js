const { Router } = require('express');

//multer para subir archivos
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//Genres
const { getGenresController } = require('../controllers/getGenresController');

//Videogames
const { getVideogamesController } = require('../controllers/getVideogamesController');
const { getVideogameController } = require('../controllers/getVideogameController');
const { getVideogamesByNameController } = require('../controllers/getVideogamesByNameController');
const { postVideogameController } = require('../controllers/postVideogameController');

//Platforms
const { getPlatformsController } = require('../controllers/getPlatformsController');
const { deleteVideogameController } = require('../controllers/deleteVideogameController');
const { postSetupController } = require('../controllers/postSetupController');
const { getSetupController } = require('../controllers/getSetupController');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//!genres
router.get('/genres', getGenresController)
// router.post('/genres', postGenresController)

//!videogames
router.get('/videogames/name', getVideogamesByNameController)
router.get('/videogames/:idVideogame', getVideogameController)
router.get('/videogames', getVideogamesController)
router.post('/videogames', postVideogameController)
router.delete('/videogames/:idVideogame', deleteVideogameController)

//!platforms
router.get('/platforms', getPlatformsController)

//setup
router.get('/setup', getSetupController)
router.post('/setup', postSetupController)

module.exports = router;
