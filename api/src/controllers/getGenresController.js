const { Genre } = require('../db')
const { getGenres } = require("./genres/getGenres")
const {postGenres}=require("./genres/postGenres")

async function getGenresController(req, res) {
    const count = await Genre.count()
    if (count > 0) {
        try {
            const genres = await getGenres()
            return res.status(200).json(genres)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {

        try {
            let data = await postGenres()
            if (data.results.length === 0) return res.status(500).json({ error: error.message })

            const insertGenres = data.results.map(({ id, name }) => ({ id, name }))

            const genres = await Genre.bulkCreate(insertGenres)
            return res.status(200).json(genres)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }




}

module.exports = { getGenresController }