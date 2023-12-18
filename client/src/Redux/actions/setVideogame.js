import { SET_VIDEOGAME } from "../actions-types";

export const setVideogame = (videogame) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_VIDEOGAME,
         payload: videogame
      });
   }
}
