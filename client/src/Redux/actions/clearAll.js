import { CLEAR_ALL } from "../actions-types";

export const clearAll = () => {
   try {
      return async (dispatch) => {
         return dispatch({
            type: CLEAR_ALL,
         });
      }
   } catch (error) {
      window.alert(error)
   }
   
}
