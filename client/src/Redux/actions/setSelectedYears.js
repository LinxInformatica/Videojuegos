import { SET_SELECTED_YEARS } from "../actions-types";

export const setSelectedYears = (id) => {
   return {
      type: SET_SELECTED_YEARS,
      payload: id
   }
}
