const { Platform } = require('../db')
const { getPlatforms } = require("./platforms/getPlatforms")
const { postPlatforms } = require('./platforms/postPlatforms')

async function getPlatformsController(req, res) {
    const count = await Platform.count()
    if (count > 0) {
        //busco en datos locales    
        try {
            const platforms = await getPlatforms()
            return res.status(200).json(platforms)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        try {
            let data = await postPlatforms()
            if (data.results.length === 0) return res.status(500).json({ error: error.message })

            const insertPlatforms = data.results.map(({ id, name }) => ({ id, name }))

            const platforms = await Platform.bulkCreate(insertPlatforms)
            return res.status(200).json(platforms)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }

    }
}

module.exports = { getPlatformsController }