const { getSetup } = require("./setup/getSetup")

async function getSetupController(req, res) {
    try {
        let data = await getSetup()
        
        if (!data) return res.status(500).json({ error: 'No hay datos' })

        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getSetupController }