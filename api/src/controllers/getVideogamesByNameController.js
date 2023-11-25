const { normalizeVideogame } = require("../utils/normalizeVideogame")
const { getVideogamesByName } = require("./videogames/getVideogamesByName")

async function getVideogamesByNameController(req, res) {
    const { search } = req.query

    if (!search) return res.status(500).json({ error: 'No se ingreso la cadena de busqueda' })
    try {
        let data = await getVideogamesByName(search)

        if (!data || data.length===0) return res.status(404).json({ error: `No se encontraros datos con el nombre:${search}` })
        if (data.error) return res.status(404).json({ error: data.error })

        const videogames = data.map((videogame) => (normalizeVideogame(videogame)))

        return res.status(200).json(videogames)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getVideogamesByNameController }