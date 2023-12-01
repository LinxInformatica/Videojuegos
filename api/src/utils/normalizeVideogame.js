const normalizeVideogame = (videogame) => {
    let genres=[]
    let platforms=[]
    let image=''

    if (videogame.source === 1) {
        //segun formato de sequelize 
        genres = videogame.genres 
        platforms = videogame.platforms.map((platform) => {
            const { id, name } = platform
            return { id, name }
        })
        image=videogame.image
    } else {
        //segun formato de api
        genres = videogame.genres.map((genre) => ({ id: genre.id, name: genre.name }))
        platforms = videogame.platforms.map((platform) => ({ id: platform.platform.id, name: platform.platform.name }))
        image=videogame.background_image
    }
    return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.slug,
        image: image,
        released: videogame.released,
        rating: videogame.rating,
        source: videogame.source,
        genres: genres,
        platforms: platforms
    }
}

module.exports = { normalizeVideogame }