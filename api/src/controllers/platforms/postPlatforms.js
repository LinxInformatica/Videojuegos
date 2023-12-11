const axios = require('axios')
const { URL_API } = require('../../utils//config.helper')
const { API_KEY } = process.env

const postPlatforms = async () => {
    const url = `${URL_API}/platforms?key=${API_KEY}`
    console.log('Loading Platforms from API')
    try {
        const { data } = await axios.get(url)
        return data

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postPlatforms }