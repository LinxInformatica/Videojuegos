require('dotenv').config();
const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const {API_KEY}=process.env

const getGenres = async () => {
    const url = `${URL_API}/genres?key=${API_KEY}`
    console.log(url)
    try {
        const { data } = await axios.get(url)
        return data.results

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getGenres }