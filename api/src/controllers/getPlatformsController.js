const { getPlatforms } = require("./platforms/getPlatforms")

async function getPlatformsController(req, res) {
    try {
        const platforms = await getPlatforms()
        return res.status(200).json(platforms)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getPlatformsController }