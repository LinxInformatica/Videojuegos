import {SET_TOTAL_OF_PAGES} from "../actions-types";

export const setTotalOfPages = (totalItems) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_TOTAL_OF_PAGES,        
         payload:totalItems
      });
   }

}
