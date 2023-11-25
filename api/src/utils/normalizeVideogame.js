const normalizeVideogame = (videogame) => {
    // const genres=videogame.genres.map((genre)=>({id:genre[0],name:genre[1]}))
    // const platforms=videogame.platforms.map((platform)=>({id:platform.platform.id,name:platform.platform.name}))
    return {
        id: videogame.id,
        name: videogame.name,
        descripcion: videogame.slug,
        image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        source: videogame.source
        //        genres: genres,
        //        platforms: platforms
    }
}

module.exports = { normalizeVideogame }