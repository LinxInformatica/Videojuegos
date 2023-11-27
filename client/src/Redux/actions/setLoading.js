import { LOADING } from "../actions-types";

export const setLoading = (data) => {
   try {
      return async (dispatch) => {
         return dispatch({
            type: LOADING,
            payload: data,
         });
      }
   } catch (error) {
      window.alert(error)
   }
};
