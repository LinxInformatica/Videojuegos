import axios from 'axios'
import SITEROUTES from "../../helpers/siteroutes.helper";
import { ADD_VIDEOGAMES } from "../actions-types";

export const getAllVideogames = (name) => {
    const endpoint = `${SITEROUTES.VIDEOGAMES}`;
    
 
    try {
       return async (dispatch) => {
          const { data } = await axios.get(endpoint)
          return dispatch({
             type: ADD_VIDEOGAMES,
             payload: data,
          });
       }
    } catch (error) {
       window.alert(error)
    }
 };
 
 