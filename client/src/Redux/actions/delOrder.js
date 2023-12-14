import { DEL_ORDER} from "../actions-types";

export const delOrder = (id) => {
   return async (dispatch) => {
      return dispatch({
         type: DEL_ORDER,
         payload:id
      });
   }

}
