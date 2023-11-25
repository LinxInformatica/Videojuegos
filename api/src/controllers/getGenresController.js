const { getGenres } = require("./genres/getGenres")

async function getGenresController(req, res) {
    try {
        const genres = await getGenres()
        console.log(genres)
        return res.status(200).json(genres)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

module.exports = { getGenresController }