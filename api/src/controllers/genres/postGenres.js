const axios = require('axios')
const { URL_API } = require('../../utils//config.helper')
const { API_KEY } = process.env

const postGenres = async () => {
    const url = `${URL_API}/genres?key=${API_KEY}`
    try {
        const { data } = await axios.get(url)
        return data

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postGenres }