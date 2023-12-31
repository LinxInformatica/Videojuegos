import axios from 'axios'
import SITEROUTES from"../../helpers/siteroutes.helper";
import { GET_ALL_GENRES, GET_SETUP } from "../actions-types";

export const getSetup = () => {
   const endpoint = `${SITEROUTES.SETUP}`;
   try {
      return async (dispatch) => {
         const { data } = await axios.get(endpoint)

         return dispatch({
            type: GET_SETUP,
            payload: data,
         });
      }
   } catch (error) {

      window.alert(error)
   }
};
