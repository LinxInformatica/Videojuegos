import { PUT_SELECTED_FILTERS } from "../actions-types";

export const putSelectedFilters = () => {
   return async (dispatch) => {
      return dispatch({
         type: PUT_SELECTED_FILTERS,
      });
   }

}
