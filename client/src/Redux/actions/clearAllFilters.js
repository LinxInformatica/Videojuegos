import { CLEAR_ALL_FILTERS } from "../actions-types";

export const clearAllFilters = () => {
   return async (dispatch) => {
      return dispatch({
         type: CLEAR_ALL_FILTERS,
      });
   }
}
