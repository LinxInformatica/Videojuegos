import { SET_SELECTED_FILTERS } from "../actions-types";

export const setSelectedFilters = (uniqueId) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_SELECTED_FILTERS,
         payload:uniqueId
      });
   }

}
