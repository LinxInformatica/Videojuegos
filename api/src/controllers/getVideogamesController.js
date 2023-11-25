const { normalizeVideogame } = require("../utils/normalizeVideogame")
const { getVideogames } = require("./videogames/getVideogames")

async function getVideogamesController(req, res) {
    try {
        let data = await getVideogames()
        
        if (!data) return res.status(500).json({ error: 'No hay datos' })

        const videogames = data.map((videogame) => (normalizeVideogame(videogame)))

        return res.status(200).json(videogames)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogamesController }