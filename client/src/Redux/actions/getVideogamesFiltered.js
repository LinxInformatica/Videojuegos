import { GET_VIDEOGAMES_FILTERED} from "../actions-types";

export const getVideogamesFiltered = () => {
   return async (dispatch) => {
      return dispatch({
         type: GET_VIDEOGAMES_FILTERED
      });
   }
   
}
