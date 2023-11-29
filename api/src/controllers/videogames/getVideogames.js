const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { Videogame, Genre, Platform, Videogame_genre } = require('../../db')

//! datos locales
const { VIDEOS } = require('../../utils/data')
const { sequelizeToVideogame } = require('../../utils/sequelizeToVideoGame')


const getVideogames = async () => {
    //datos de la BD
    try {
        const videogamesLocal = await getVideogamesLocal()
        const videogamesApi = await getVideogamesApi()

        return [...videogamesLocal,...videogamesApi]
    } catch (error) {
        return ({ error: error.message })
    }

}

const getVideogamesLocal = async () => {
    try {
        let videogames = await Videogame.findAll(
            {
                raw:true,
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

const getVideogamesApi = async () => {
    let videogamesSource = []
    try {
        const videogames = VIDEOS.results
        videogamesSource = videogames.map((video) => ({ ...video, source: 2 }))

        return videogamesSource
    } catch (error) {
        return { error: error.message }
    }
}


const getVideogamesApi2 = async () => {
    const url = `${URL_API}/games?key=${API_KEY}`
    let videogamesSource = []
    try {
        const { data } = await axios.get(url)
        videogamesSource = data.map((video) => ({ ...video, source: 2 }))

        return videogamesSource
    } catch (error) {
        return { error: error.message }
    }

}

module.exports = { getVideogames }