import { ADD_VIDEOGAME } from "../actions-types";

export const addVideogame = (videogame) => {
   return async (dispatch) => {
      return dispatch({
         type: ADD_VIDEOGAME,
         payload: videogame
      });
   }
}
