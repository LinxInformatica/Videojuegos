require('dotenv').config();
const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { VIDEOS } = require('../../utils/data')

const getVideogame = async (idVideogame) => {
    const video = VIDEOS.find((v) => v.id === parseInt(idVideogame))

    return video

}
const getVideogame2 = async (idVideogame) => {
    const url = `${URL_API}/games/${idVideogame}?key=${API_KEY}`
    console.log(url)
    try {
        const { data } = await axios.get(url)
        return data

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getVideogame }