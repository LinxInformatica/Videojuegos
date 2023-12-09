import { SET_ALL_FILTERS } from "../actions-types";

export const setAllFilters = (name) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_ALL_FILTERS,
         payload:name
      });
   }
   
   // return {
   //    type: SET_ALL_FILTERS,
   //    payload: name
   // }
}
