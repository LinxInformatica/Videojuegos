const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getGenresController } = require('../controllers/getGenresController');
const { getVideogamesController } = require('../controllers/getVideogamesController');
const { getVideogameController } = require('../controllers/getVideogameController');
const { getVideogamesByNameController } = require('../controllers/getVideogamesByNameController');
const { postVideogameController } = require('../controllers/postVideogameController')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//genres
router.get('/genres', getGenresController)

router.get('/videogames/name', getVideogamesByNameController)
router.get('/videogames/:idVideogame', getVideogameController)
router.get('/videogames', getVideogamesController)
router.post('/videogames', postVideogameController)

module.exports = router;
