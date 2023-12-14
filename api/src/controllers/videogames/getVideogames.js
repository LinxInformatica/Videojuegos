const axios = require('axios')
const { URL_API, PAGE_SIZE } = require('../../utils//config.helper')
const { API_KEY } = process.env
const { Videogame, Genre, Platform, Videogame_genre } = require('../../db')

//! datos locales
const { VIDEOS } = require('../../utils/data')
const { sequelizeToVideogame } = require('../../utils/sequelizeToVideoGame')


const getVideogames = async () => {
    //datos de la BD
    try {
        const videogamesLocal = await getVideogamesLocal()
        return [...videogamesLocal]
        
        const videogamesApi1 = await getVideogamesApi(1,25)
        const videogamesApi2 = await getVideogamesApi(2,25)
        const videogamesApi3 = await getVideogamesApi(3,25)
        const videogamesApi4 = await getVideogamesApi(4,25)
        
        return [...videogamesLocal,...videogamesApi1,...videogamesApi2,...videogamesApi3,...videogamesApi4]

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
const getVideogamesApi = async (page,page_size) => {
    const url = `${URL_API}/games?key=${API_KEY}&page=${page}&page_size=${page_size}`
    let videogamesSource = []
    try {
        const response=await axios.get(url)
        const {results}=response.data
        videogamesSource = results.map((video) => ({ ...video, source: 2 }))
        return videogamesSource
    } catch (error) {
        return { error: error.message }
    }

}

const getVideogamesData = async () => {
    let videogamesSource = []
    try {
        const videogames = VIDEOS.results
        videogamesSource = videogames.map((video) => ({ ...video, source: 2 }))

        return videogamesSource
    } catch (error) {
        return { error: error.message }
    }
}



module.exports = { getVideogames }