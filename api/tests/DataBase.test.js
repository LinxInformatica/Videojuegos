require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DIALECT_OPTIONS, SSL
} = process.env;


const { Sequelize, DataTypes } = require("sequelize");

const {Platform,Videogame}= require('../src/db')

//tomo atributo de videogame
const attributesVideogame=Videogame.getAttributes()

describe("El modelo 'Platform'", () => {
  it("Platform debe haber sido creado correctamente y con el nombre correcto", () => {
    expect(Platform).toBeDefined();
  });
  
  it("Debe tener una relación con el modelo 'Videogame'", () => {
    expect(Platform.associations.videogames).toBeDefined();
  });
});

describe("El modelo 'Videogame'", () => {
  it("Videogame debe haber sido creado correctamente y con el nombre correcto", () => {
    expect(Videogame).toBeDefined();
  });
  it("id: Un identificador único de tipo UUID, sin incremento automático y clave primaria.", () => {
    expect(attributesVideogame.id.type instanceof DataTypes.UUID).toBe(true);
    expect(attributesVideogame.id.primaryKey).toBe(true);
    expect(attributesVideogame.id.autoIncrement).toBe(false);
  });

  it("Debe tener una relación con el modelo 'Platform'", () => {
    expect(Videogame.associations.platforms).toBeDefined();
  });
});

describe("La relación entre ambos modelos", () => {
  it("Debe ser de varios a varios, y debe estar dada a través de la tabla intermedia llamada 'videogame_platform'", () => {
    expect(Platform.associations.videogames.through.model.tableName).toBe("videogame_platform");
    expect(Videogame.associations.platforms.through.model.tableName).toBe("videogame_platform");
  });
});
