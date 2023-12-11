import { SET_CURRENT_PAGE } from "../actions-types";

export const setCurrentPage = (page) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_CURRENT_PAGE,
         payload: page
      });
   }

}
