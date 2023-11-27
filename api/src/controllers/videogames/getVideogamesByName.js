const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { Videogame, Genre, Platform } = require('../../db')
const { Op } = require('sequelize')

const { VIDEOS } = require('../../utils/data')
const { formatSequelize } = require('../../utils/formatSequelize')


const getVideogamesByName = async (search) => {
    try {
        const videogamesLocal = await getVideogamesByNameLocal(search)
        const videogamesApi = await getVideogamesByNameApi(search)

        return [...videogamesLocal, ...videogamesApi]

    } catch (error) {
        return ({ error: error.message })
    }
}

const getVideogamesByNameLocal = async (search) => {

    let videogames = await Videogame.findAll(
        {
            where: { name: { [Op.iLike]: `%${search}%` } },
            raw: false,
            include: [
                { model: Genre, attributes: ["id", "name"] },
                { model: Platform, attributes: ["id", "name"] }
            ]
        }
    )
    if (videogames.length !== 0) {
        const videogamesFormat = formatSequelize(videogames)
        console.log(videogamesFormat)
        const videogamesSource = videogamesFormat.map((video) => ({ ...video, source: 1 }))
        return videogamesSource
    }
    return []
}

const getVideogamesByNameApi = async (search) => {

    const videogames = VIDEOS.results.filter((v) => v.name.toUpperCase().includes(search.toUpperCase()))
    if (videogames === null) return []

    const videogamesSource = videogames.map((video) => ({ ...video, source: 2 }))
    return videogamesSource
}

const getVideogamesByNameApi2 = async (search) => {
    const url = `${URL_API}/games?key=${API_KEY}&search=${search}`

    try {
        const { data } = await axios.get(url)
        const videogamesSource = data.results.map((video) => ({ ...video, source: 2 }))
        return videogamesSource

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getVideogamesByName }