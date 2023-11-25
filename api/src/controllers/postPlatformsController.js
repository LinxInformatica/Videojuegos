const { Platform } = require('../db')
const { postPlatforms } = require('./platform/postPlatforms')

async function postPlatformsController(req, res) {
    const count = await Platform.count()
    if (count > 0) return res.status(200).json({ error: `La tabla contiene ${count} registros, no se importaran nuevamente` })

    try {
        let data = await postPlatforms()
        if (data.results.length===0) return res.status(500).json({ error: error.message })

        const insertPlatforms = data.results.map(({ id, name }) => ({ id, name }))

        const platforms = await Platform.bulkCreate(insertPlatforms)
        return res.status(200).json(platforms)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

module.exports = { postPlatformsController }