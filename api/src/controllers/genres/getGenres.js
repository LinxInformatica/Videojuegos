const {Genre}=require('../../db')

const getGenres = async () => {
    try {
        const genres = await Genre.findAll()
        return genres

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getGenres }