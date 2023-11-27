const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    released:{
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
    name: {
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
    source:{
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
    genres:{
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
    platforms:{
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
    rating:{
      type: DataTypes.STRING(1),
      defaultValue:'A'
    },
  });
};
