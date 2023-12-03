import { PUT_SELECTED_SOURCES } from "../actions-types";

export const putSelectedSources = () => {
   console.log('PUT')
   return {
      type: PUT_SELECTED_SOURCES
   }
}
