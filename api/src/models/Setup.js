const { DataTypes, INTEGER } = require('sequelize');
const { PAGE_SIZE } = require('../helpers/setup.helper');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('setup', {
    pk:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    page_size: {
      type: DataTypes.INTEGER,
      default:PAGE_SIZE
    },
    filters: {
      type: DataTypes.TEXT,
      default:'[]'
    },
    orders: {
      type: DataTypes.TEXT,
      default:'[]'
    },
  });
};
