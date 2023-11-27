const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('filter', {
    startReleased:{
      type: DataTypes.DATEONLY,
    },
    endReleased:{
      type: DataTypes.DATEONLY,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue:"",
      allowNull:false
    },
    source:{
      type:DataTypes.INTEGER,
      defaultValue:0,
      allowNull:false
    },
    genres:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    minRating:{
      type:DataTypes.INTEGER
    },
    maxRating:{
      type:DataTypes.INTEGER
    }
  });
};
