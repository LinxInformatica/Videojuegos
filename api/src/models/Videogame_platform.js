const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame_platform', {
    videogameId: {
      type: DataTypes.UUID
    },
    platformId: {
      type: DataTypes.INTEGER
    }
  },
    { tableName: 'videogame_platform' }
  )
};
