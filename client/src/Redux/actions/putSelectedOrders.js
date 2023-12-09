import { PUT_SELECTED_ORDERS } from "../actions-types";

export const putSelectedOrders = () => {
   return async (dispatch) => {
      return dispatch({
         type: PUT_SELECTED_ORDERS,
      });
   }

}
