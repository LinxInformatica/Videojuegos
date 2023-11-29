import { GET_VIDEOGAMES_BY_NAME } from "../actions-types";

export const getVideogamesByName = (name) => {
   return {
      type: GET_VIDEOGAMES_BY_NAME,
      payload: name
   }
}
