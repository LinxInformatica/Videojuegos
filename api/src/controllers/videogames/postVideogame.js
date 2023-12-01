const { Videogame, Videogame_genre, Videogame_platform } = require('../../db')

const postVideogame = async (id, name, description, platforms, image, released, rating, genres) => {

    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where: { id: id },
            defaults: {
                name,
                description,
                image,
                released,
                rating
            }
        })

        //mapeo y envio Videogame_genre
        const videogameGenres = genres.map(async (g) => {
            const [genre, genreCreated] = await Videogame_genre.findOrCreate({
                where: { genreId: g.id, videogameId: id }
            });

            return { genre, genreCreated };
        });

        const genreResults = await Promise.all(videogameGenres);

        //mapeo y envio videogame_platforms
        const videogamePlatforms = platforms.map(async (p) => {
            const [platform, platformCreated] = await Videogame_platform.findOrCreate({
                where: { platformId: p.id, videogameId: id }
            });

            return { platform, platformCreated };
        });

        const platformResults = await Promise.all(videogamePlatforms);

        return { videogame, created, genres: genreResults, platforms: platformResults }

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postVideogame }