import { SET_SELECTED_GENRES } from "../actions-types";

export const setSelectedGenres = (idGenre) => {
   return {
      type: SET_SELECTED_GENRES,
      payload: idGenre
   }
}
