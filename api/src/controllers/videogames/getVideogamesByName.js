require('dotenv').config();
const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { VIDEOS } = require('../../utils/data')

const getVideogamesByName = async (search) => {

    const results = VIDEOS.results.filter((v) => v.name.toUpperCase().includes(search.toUpperCase()))
    const data = { results: results }
    return data

}
const getVideogamesByName2 = async (search) => {
    const url = `${URL_API}/games?key=${API_KEY}&search=${search}`
    const query = { search: search }
    try {
        const { data } = await axios.get(url)
        return data

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getVideogamesByName }