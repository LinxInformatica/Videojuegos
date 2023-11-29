const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('filter', {
    released:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    source:{
      type:DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull:false
    },
    genres:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    rating:{
      type:DataTypes.ARRAY(DataTypes.INTEGER)
    },
    
  });
};
