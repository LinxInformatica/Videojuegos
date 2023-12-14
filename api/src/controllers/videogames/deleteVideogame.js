const { Videogame } = require('../../db')

const deleteVideogame = async (id) => {

  try {
    const result= await Videogame.destroy({
      force: true ,
      where: {
        id: id
      }
    })
    return ({result:result})

  } catch (error) {
    return ({ error: error.message })
  }

}

module.exports = { deleteVideogame }