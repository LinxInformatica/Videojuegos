const { Videogame } = require('../../db')

const postVideogame = async (id, name, description, platforms, image, released, rating) => {
    
    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where: { id:id },
            defaults: {
                name,
                description,
                image,
                released,
                rating
            }
        })
   
        return {videogame,created}

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postVideogame }