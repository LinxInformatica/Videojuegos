const { v4: uuidv4 } = require('uuid');

const { postVideogame } = require("./videogames/postVideogame")

async function postVideogameController(req, res) {
    let { id } = req.body
    const { name, description, platforms, image, imageBase64, released, rating, genres } = req.body
    
    if (!id) id = uuidv4() //por si lo cargo desde afuera de la app
    
    if (!name ||
        !description ||
        !platforms ||
        !image ||
        !released ||
        rating < 0 ||
        !genres) return res.status(400).json({ error: "Faltan Datos" })

    try {
        const { videogame, created ,edited} = await postVideogame(id, name, description, platforms, image, imageBase64, released, rating, genres)
        
        if (edited) return res.status(201).json({...videogame,edited:true})
        
        if (created) return res.status(200).json({...videogame,created:true})

        //return res.status(200).json(videogame)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { postVideogameController }