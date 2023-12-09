import { SET_SELECTED_ORDERS } from "../actions-types";

export const setSelectedOrders = (uniqueId) => {
   return async (dispatch) => {
      return dispatch({
         type: SET_SELECTED_ORDERS,
         payload:uniqueId
      });
   }

}
