import { SET_PAGE_SIZE } from "../actions-types";

export const setPageSize = (page_size) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_PAGE_SIZE,
         payload:page_size
      });
   }

}
