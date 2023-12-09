import { CLEAR_SELECTED_FILTERS } from "../actions-types";

export const clearSelectedFilters = (payload) => {
   return async (dispatch) => {
      return dispatch({
         type: CLEAR_SELECTED_FILTERS,
         payload:payload
      });
   }
}
