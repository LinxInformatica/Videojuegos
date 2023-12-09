import { SELECT_ALL_SELECTED_FILTERS} from "../actions-types";

export const selectAllSelectedFilters = (payload) => {
   return async (dispatch) => {
      return dispatch({
         type: SELECT_ALL_SELECTED_FILTERS,
         payload:payload
      });
   }

}
