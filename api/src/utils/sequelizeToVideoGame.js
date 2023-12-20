function sequelizeToVideogame(videogames) {
    const result = [];

    videogames.forEach((videogame) => {
        const videogameId = videogame.id;

        // Verificar si ya existe un juego con el mismo ID en el resultado
        const existingVideogame = result.find((v) => v.id === videogameId);

        const genreId = videogame['genres.id'];
        const genreName = videogame['genres.name'];
        const platformId = videogame['platforms.id'];
        const platformName = videogame['platforms.name'];

        if (existingVideogame) {
            // Si ya existe, agregar género y plataforma al juego existente
            if (!existingVideogame.genres.some((g) => g.id === genreId)) {
                existingVideogame.genres.push({ id: genreId, name: genreName });
            }

            // Verificar si la plataforma no está presente antes de agregarla
            if (!existingVideogame.platforms.some((p) => p.id === platformId)) {
                existingVideogame.platforms.push({ id: platformId, name: platformName });
            }
        } else {
            // Si no existe, agregar un nuevo videojuegojuego con género y plataforma inicial
            const newVideogame = {
                id: videogameId,
                name: videogame.name,
                description: videogame.description,
                image: videogame.image,
                released: videogame.released,
                rating: videogame.rating,
                genres: [{ id: genreId, name: genreName }],
                platforms: [{ id: platformId, name: platformName }],
            };

            // Agregar el nuevo juego al resultado
            result.push(newVideogame);
        }
    });

    return result;
}



module.exports = { sequelizeToVideogame }