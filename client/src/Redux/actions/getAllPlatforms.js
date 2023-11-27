import axios from 'axios'
import SITEROUTES from "../../helpers/siteroutes.helper";
import { ADD_PLATFORMS } from "../actions-types";

export const getAllPlatforms = () => {
   const endpoint = `${SITEROUTES.PLATFORMS}`;
   try {
      return async (dispatch) => {
         const { data } = await axios.get(endpoint)
         return dispatch({
            type: ADD_PLATFORMS,
            payload: data,
         });
      }
   } catch (error) {
      window.alert(error)
   }
};

