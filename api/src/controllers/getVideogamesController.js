const { dataVideogame } = require("../utils/dataVideogame")
const { getVideogames } = require("./videogames/getVideogames")

async function getVideogamesController(req, res) {
    try {
        let data = await getVideogames()

        if (!data) return res.status(500).json({ error: 'No hay datos' })

        const videos = data.results.map((video) => (dataVideogame(video)))

        return res.status(200).json(videos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogamesController }