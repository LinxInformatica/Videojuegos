import { DEL_FILTER_NAME } from "../actions-types";

export const delFilterName = (name) => {
   return {
      type: DEL_FILTER_NAME,
      payload: name
   }
}
