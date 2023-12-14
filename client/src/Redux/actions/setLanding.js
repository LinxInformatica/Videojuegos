import { LANDING } from "../actions-types";

export const setLanding = (data) => {
   
   try {
      return async (dispatch) => {
         return dispatch({
            type: LANDING,
            payload: data,
         });
      }
   } catch (error) {
      window.alert(error)
   }
};
