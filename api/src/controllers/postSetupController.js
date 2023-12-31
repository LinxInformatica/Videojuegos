const { postSetup } = require("./setup/postSetup")

async function postSetupController(req, res) {
    const { page_size,filters,orders } = req.body
    if (!page_size ||
        page_size <= 0
    ) return res.status(400).json({ error: "Faltan Datos o datos incorrectos" })

    try {
        const { newSetup,created} = await postSetup(page_size,filters,orders)
        return res.status(200).json(newSetup)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { postSetupController }