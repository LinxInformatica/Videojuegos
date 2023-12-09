import { GET_SELECTED_FILTERS} from "../actions-types";

export const getSelectedFilters = () => {
   return async (dispatch) => {
      return dispatch({
         type: GET_SELECTED_FILTERS,
      });
   }

}
