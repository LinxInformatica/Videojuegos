const { normalizeVideogame } = require("../utils/normalizeVideogame")
const { getVideogame } = require("./videogames/getVideogame")

async function getVideogameController(req, res) {
    const { idVideogame } = req.params
    try {
        let data = await getVideogame(idVideogame)
        if (!data) return res.status(404).json({ error: `No se encontraros datos con el id:${idVideogame}` })
        if (data.error) return res.status(404).json({ error: data.error })
        const videogames = data.map((videogame) => (normalizeVideogame(videogame)))
        
        return res.status(200).json(videogames)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogameController }