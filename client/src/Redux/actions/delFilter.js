import { DEL_FILTER } from "../actions-types";

export const delFilter = (key) => {
   return async (dispatch) => {
      return dispatch({
         type: DEL_FILTER,
         payload:key
      });
   }

}
