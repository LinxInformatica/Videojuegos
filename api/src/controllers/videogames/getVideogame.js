const axios = require('axios')
const { URL_API } = require('../../utils/helpers')
const { API_KEY } = process.env
const { Videogame, Genre, Platform } = require('../../db')

//! DATOS LOCALES 
const { VIDEOS } = require('../../utils/data')

const getVideogame = async (idVideogame) => {
    //busco local
    try {
        //si no es numerico ,es uuid
        if (isNaN(idVideogame)) {
            const videogameLocal = await getVideogameLocal(idVideogame)
            return videogameLocal
        } else {
            const videogameApi = await getVideogameApi(idVideogame)
            return videogameApi
        }
    } catch (error) {
        return ({ error: error.message })
    }
}


const getVideogameLocal = async (idVideogame) => {
    //busco local
        let videogame = await Videogame.findByPk(idVideogame)
        
        if (typeof videogame ==='object') {
            videogame.source = 1
            return videogame
        }
        

}

const getVideogameApi = async (idVideogame) => {
    //busco local
    let videogame = VIDEOS.results.find((v) => v.id === parseInt(idVideogame))
    if (typeof videogame==='object') {
        videogame.source = 2
        return videogame
    }
    

}

const getVideogameApi2 = async (idVideogame) => {
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