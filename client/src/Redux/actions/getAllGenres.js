import axios from 'axios'
import SITEROUTES from "../../helpers/siteroutes.helper";
import { GET_ALL_GENRES } from "../actions-types";

export const getAllGenres = () => {
   const endpoint = `${SITEROUTES.GENRES}`;
   try {
      return async (dispatch) => {
         const { data } = await axios.get(endpoint)
         return dispatch({
            type: GET_ALL_GENRES,
            payload: data,
         });
      }
   } catch (error) {
      window.alert(error)
   }
};

