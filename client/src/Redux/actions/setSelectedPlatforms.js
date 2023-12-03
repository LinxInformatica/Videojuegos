import { SET_SELECTED_PLATFORMS } from "../actions-types";

export const setSelectedPlatforms = (id) => {
   return {
      type: SET_SELECTED_PLATFORMS,
      payload: id
   }
}
