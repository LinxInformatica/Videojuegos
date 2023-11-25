const { Genre } = require('../db')
const {postGenres}=require('../controllers/genres/postGenres')

async function postGenresController(req, res) {
    const count = await Genre.count()
    if (count > 0) return res.status(200).json({ error: `La tabla contiene ${count} registros, no se importaran nuevamente` })

    try {
        let data = await postGenres()
        if (data.results.length===0) return res.status(500).json({ error: error.message })

        const insertGenres = data.results.map(({ id, name }) => ({ id, name }))

        const genres = await Genre.bulkCreate(insertGenres)
        return res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

module.exports = { postGenresController }