const { Sequelize, DataTypes } = require("sequelize");

const { Videogame } = require('../src/db')

const { postVideogameController } = require("../src/controllers/postVideogameController")

const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

const Videogame1 = { //incompleto 
    body: {
        name: 'videogame de prueba'
    }
}
const Videogame2 = { //impcompleto falta rating
    body: {
        name: 'videogame de prueba',
        description: 'Descripcion de prueba',
        genres: [{ id: 1, name: 'genre de prueba' }],
        platforms: [{ id: 1, name: 'platform de prueba' }],
        image: 'imagen de prueba',
        released: "2023-12-12"
    }
}

const Videogame3 = { //complet0
    body: {
        name: 'videogame de prueba',
        description: 'Descripcion de prueba',
        genres: [{ id: 1, name: 'genre de prueba' }],
        platforms: [{ id: 1, name: 'platform de prueba' }],
        rating: 1,
        image: 'imagen de prueba',
        imageBase64: 'prueba de image base 64',
        released: "2023-12-12"
    }
}

describe("Videogame", () => {
    it("Si falta algun dato debe devolver Faltan Datos", async () => {
        const response1 = response
        await postVideogameController(Videogame1, response1);
        expect(response1.status).toHaveBeenCalledWith(400);
        expect(response1.json).toHaveBeenCalledWith({ error: "Faltan Datos" });

        const response2 = response
        await postVideogameController(Videogame2, response2);
        expect(response2.status).toHaveBeenCalledWith(400);
        expect(response2.json).toHaveBeenCalledWith({ error: "Faltan Datos" });

    });

    xit("Deben haberse creado todos los registros/instancias correspondientes", async () => {
        const response3 = response
        await postVideogameController(Videogame3, response3);
        expect(response3.status).toHaveBeenCalledWith(200);
        //const results = await Videogame.findAll();
        // expect(results).toHaveLength(3);
        // expect(results.every((r) => r.name)).toBe(true);
        // expect(results.every((r) => r.id)).toBe(true);
        // expect(results.every((r) => r.area)).toBe(true);
        // expect(results.some((r) => r.name === "Dr.Chapatín"));
        // expect(results.some((r) => r.name === "Dr.Strange"));
        // expect(results.some((r) => r.area === "Time Traveler"));
        // expect(results.some((r) => r.area === "Queles"));
    });
});
