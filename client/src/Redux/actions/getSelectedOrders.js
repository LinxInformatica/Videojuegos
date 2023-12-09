import { GET_SELECTED_ORDERS} from "../actions-types";

export const getSelectedOrders = () => {
   return async (dispatch) => {
      return dispatch({
         type: GET_SELECTED_ORDERS,
      });
   }

}
