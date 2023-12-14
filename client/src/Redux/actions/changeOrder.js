import { CHANGE_ORDER} from "../actions-types";

export const changeOrder = (id) => {
   return async (dispatch) => {
      return dispatch({
         type: CHANGE_ORDER,
         payload:id
      });
   }

}
