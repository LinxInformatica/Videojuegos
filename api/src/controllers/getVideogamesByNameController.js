const { dataVideogame } = require("../utils/dataVideogame")
const { getVideogamesByName } = require("./videogames/getVideogamesByName")

async function getVideogamesByNameController(req, res) {
    const { search } = req.query

    if (!search) return res.status(500).json({ error: 'No se ingreso la cadena de busqueda' })
    try {
        let data = await getVideogamesByName(search)

        if (data.results.length === 0) return res.status(400).json({ error: `No hay videojuegos que contengan el texto ${search}` })

        const videos = data.results.map((video) => (dataVideogame(video)))

        return res.status(200).json(videos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogamesByNameController }