import { DEL_FILTER } from "../actions-types";

export const delFilter = (key) => {
   return {
      type: DEL_FILTER,
      payload: key
   }
}
