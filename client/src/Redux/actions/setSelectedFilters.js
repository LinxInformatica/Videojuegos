import { SET_SELECTED_FILTERS } from "../actions-types";

export const setSelectedFilters = (uniqueId) => {
   return {
      type: SET_SELECTED_FILTERS,
      payload: uniqueId
   }
}
