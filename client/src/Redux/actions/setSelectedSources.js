import { SET_SELECTED_SOURCES } from "../actions-types";

export const setSelectedSources = (id) => {
   return {
      type: SET_SELECTED_SOURCES,
      payload: id
   }
}
