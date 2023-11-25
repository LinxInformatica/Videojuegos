const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame_genre', {
    videogameId: {
      type: DataTypes.UUID
    },
    genreId: {
      type: DataTypes.INTEGER
    }
  },
    { tableName: 'videogame_genre' }
  )
};
