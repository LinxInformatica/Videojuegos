require('dotenv').config();
const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { VIDEOS } = require('../../utils/data')

const getVideogames = async () => {
    return VIDEOS

}
const getVideogames2 = async () => {
    const url = `${URL_API}/games?key=${API_KEY}`
    try {
        const { data } = await axios.get(url)
        return data

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getVideogames }