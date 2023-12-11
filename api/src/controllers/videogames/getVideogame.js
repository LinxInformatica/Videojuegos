const axios = require('axios')
const { URL_API, REGEXP } = require('../../utils//config.helper')
const { API_KEY } = process.env
const { Videogame, Genre, Platform } = require('../../db')

//! DATOS LOCALES 
const { VIDEOS } = require('../../utils/data')
const { sequelizeToVideogame } = require('../../utils/sequelizeToVideoGame')

const getVideogame = async (idVideogame) => {
    //busco local
    try {
        //si no es numerico ,es uuid
        if (REGEXP.UUID.test(idVideogame)) {
            const videogameLocal = await getVideogameLocal(idVideogame)
            return videogameLocal
        } else if (!isNaN(idVideogame)) {
            const videogameApi = await getVideogameApi(idVideogame)
            return videogameApi
        }
        return ({ error: 'Tipos de datos invalidos' })

    } catch (error) {
        return ({ error: error.message })
    }
}


const getVideogameLocal = async (idVideogame) => {
    try {
        let videogames = await Videogame.findAll(
            {
                where: { id: idVideogame },
                raw: true,
                include: [
                    { model: Genre, attributes: ["id", "name"], through: { attributes: [] } },
                    { model: Platform, attributes: ["id", "name"], through: { attributes: [] } }
                ]
            }
        )
        if (videogames.length !== 0) {
            const videogamesFormat = sequelizeToVideogame(videogames)
            const videogamesSource = videogamesFormat.map((video) => ({ ...video, source: 1 }))
            return videogamesSource
        }
        return []

    } catch (error) {
        return { error: error.message }
    }
}

const getVideogameData = async (idVideogame) => {
    //busco local
    let videogame = VIDEOS.results.find((v) => v.id === parseInt(idVideogame))
    if (typeof videogame === 'object') {
        videogame.source = 2
        return [videogame]
    }


}

const getVideogameApi = async (idVideogame) => {
    const url = `${URL_API}/games/${idVideogame}?key=${API_KEY}`
    try {
        const response = await axios.get(url)
        let { data } = response
        //agrego el source
        data.source=2
        return [data]

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getVideogame }