const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { Videogame, Genre, Platform, Videogame_genre } = require('../../db')

//! datos locales
const { VIDEOS } = require('../../utils/data')


const getVideogames = async () => {
     //datos de la BD
    try {
        const videogamesLocal = await getVideogamesLocal()
        const videogamesApi = await getVideogamesApi()

        return [...videogamesLocal, ...videogamesApi]
    } catch (error) {
        return ({ error: error.message })
    }

}

const getVideogamesLocal = async () => {
    let videogamesSource = []
    try {
        const videogames = await Videogame.findAll({
            raw: true,
            include: [
              { model: Genre, attributes: ["id", "name"] },
              { model: Platform, attributes: ["id", "name"] }
            ]
          });
          console.log(videogames)
        videogamesSource = videogames.map((video) => ({ ...video, source: 1 }))
        return videogamesSource
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