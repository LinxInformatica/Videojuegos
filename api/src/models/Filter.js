const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('filter', {
    pk:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    id:{
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
    },
    type:{
      type:DataTypes.STRING,
    },
  });
};
