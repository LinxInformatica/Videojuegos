const { Videogame, Videogame_genre, Videogame_platform } = require('../../db');
const path = require('path');
const fs = require('fs')

const postVideogame = async (id, name, description, platforms, image, imageBase64, released, rating, genres) => {
    // Decodificar la cadena base64 de la imagen

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');

    const fileName = image //`${Date.now()}.jpg`;

    // Ruta donde se guardará el archivo
    const images = '../../../../images/'
    const filePath = path.join(__dirname, images, fileName);

    let edited = false
    try {
        if (!fs.existsSync(filePath)){
            fs.writeFile(filePath, dataBuffer, (error) => {
                if (error) {
                    return ({ error: error.message })
                }
            })
        }
        const newData = {
            name: name,
            description: description,
            image: fileName,
            released: released,
            rating: rating
        }
        let [videogame, created] = await Videogame.findOrCreate({
            where: { id: id },
            defaults: newData
        })
        //lo encontro
        if (!created) {
            edited = true
            await Videogame.update(newData, {
                where: { id: id }
            })
            //borro generos y platforms 
            await Videogame_genre.destroy({
                where: {
                    videogameId: id
                }
            })
            await Videogame_platform.destroy({
                where: {
                    videogameId: id
                }
            })
        }

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

        return { videogame, created, edited, genres: genreResults, platforms: platformResults }
    } catch (error) {
        return ({ error: error.message })
    }
}

module.exports = { postVideogame }