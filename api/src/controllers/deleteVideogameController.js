const { deleteVideogame } = require("./videogames/deleteVideogame")

async function deleteVideogameController(req, res) {
    const {idVideogame} = req.params
    if (!idVideogame)
        return res.status(400).json({ error: "Faltan Datos" })

    try {
        const { result } = await deleteVideogame(idVideogame)
        if (!result) return res.status(404).json({ error: 'Videogame not deleted' })

        return res.status(200).json({message:'Videogame deleted successfully!'})

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { deleteVideogameController }