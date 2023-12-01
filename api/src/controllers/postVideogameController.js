const { v4: uuidv4 } = require('uuid');

const { postVideogame } = require("./videogames/postVideogame")


async function postVideogameController(req, res) {
    const { name, description, platforms, image, released, rating, genres } = req.body
    const id = uuidv4()

    if (!name ||
        !description ||
        !platforms ||
        !image ||
        !released ||
        !rating ||
        !genres) return res.status(400).json({ error: "Faltan Datos" })

    try {
        const { videogame, created } = await postVideogame(id, name, description, platforms, image, released, rating, genres)
        if (!created) return res.status(409).json({ error: 'Dato ya existente' })

        return res.status(201).json(videogame)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { postVideogameController }