const formatSequelize = (videogames) => {
    return videogames.map((videogame) => {
        const { id, name, description, image, released, rating, genres, platforms } = videogame.dataValues;
        return { id, name, description, image, released, rating, genres, platforms };
    })
}

module.exports = { formatSequelize }