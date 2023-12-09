import { DEL_VIDEOGAME } from "../actions-types";

export const delVideogame = (id) => {
   return async (dispatch) => {
      return dispatch({
         type: DEL_VIDEOGAME,
         payload: id
      });
   }
}
