const { Router } = require('express');
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

//!platforms
router.get('/platforms', getPlatformsController)
// router.post('/platforms', postPlatformsController)

module.exports = router;
