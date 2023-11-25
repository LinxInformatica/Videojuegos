const { dataVideogame } = require("../utils/dataVideogame")
const { getVideogame } = require("./videogames/getVideogame")

async function getVideogameController(req, res) {
    const { idVideogame } = req.params
    try {
        let data = await getVideogame(idVideogame)

        if (!data) return res.status(500).json({ error: 'no hay datos' })

        const video = dataVideogame(data)

        return res.status(200).json(video)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogameController }