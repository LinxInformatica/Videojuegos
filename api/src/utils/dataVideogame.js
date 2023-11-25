const dataVideogame = (video) => {
    return {
        id: video.id,
        name: video.name,
        descripcion: video.slug,
        image: video.background_image,
        released: video.released,
        rating: video.rating,
        genres: video.genres,
        platforms: video.platforms
    }
}

module.exports = { dataVideogame }