const normalizeVideogame = (videogame) => {
    let genres=[]
    let platforms=[]
    if (videogame.source === 1) {
        //segun formato de sequelize 
        genres = videogame.genres.map((genre) => {
            const { id, name } = genre.dataValues
            return { id, name }
        })

        platforms = videogame.platforms.map((platform) => {
            const { id, name } = platform.dataValues;
            return { id, name }
        })
    } else {
        //segun formato de api
        genres = videogame.genres.map((genre) => ({ id: genre.id, name: genre.name }))
        platforms = videogame.platforms.map((platform) => ({ id: platform.platform.id, name: platform.platform.name }))
    }
    return {
        id: videogame.id,
        name: videogame.name,
        descripcion: videogame.slug,
        image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        source: videogame.source,
        genres: genres,
        platforms: platforms
    }
}

module.exports = { normalizeVideogame }