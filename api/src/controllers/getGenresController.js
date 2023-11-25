const { getGenres } = require("./genres/getgenres")
const { Gender } = require('../db')


async function getGenresController(req, res) {
    const count = await Gender.count()

    if (count > 0) return res.status(200).json({ error: `La tabla contiene ${count} registros, no se importaran nuevamente` })

    try {
        let data = await getGenres()
        if (!data) return res.status(500).json({ error: error.message })

        const insertGenres = data.map(({ id, name }) => ({ id, name }))

        const genres = await Gender.bulkCreate(insertGenres)
        return res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

module.exports = { getGenresController }