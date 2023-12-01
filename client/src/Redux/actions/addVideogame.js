import { ADD_VIDEOGAME } from "../actions-types";

export const addVideogame = (videogame) => {
   return {
      type: ADD_VIDEOGAME,
      payload: videogame
   }
}
