import { SET_ALL_FILTERS } from "../actions-types";

export const setAllFilters = (name) => {
   return {
      type: SET_ALL_FILTERS,
      payload: name
   }
}
