//import action types

import FILTERTYPES from "../helpers/filterTypes.helper";
import { ADD_GENRES, ADD_PLATFORMS, ADD_VIDEOGAMES, DEL_FILTER_NAME, GET_VIDEOGAMES_BY_NAME, LOADING, REGENERATE_FILTERS } from "./actions-types";

const initialState = {
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
    allReleased: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    loading: true,
    filteredVideogames: [],
    filterNames: [],
    filterGenres: [],
    filterPlatforms: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_VIDEOGAMES:
            return { ...state, allVideogames: payload, filteredVideogames: payload };

        case ADD_GENRES:
            return { ...state, allGenres: payload };

        case ADD_PLATFORMS:
            return { ...state, allPlatforms: payload };

        case LOADING:
            return { ...state, loading: payload };

        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                filteredVideogames: state.filteredVideogames.filter((video) => video.name.toUpperCase().includes(payload.toUpperCase())),
                filterNames: [...state.filterNames, { name: payload, type: FILTERTYPES.NAME }]
            };
        case DEL_FILTER_NAME:
            const newFilterNames = state.filterNames.filter((name) => name.name !== payload)
            return {
                ...state,
                filterNames: newFilterNames
            };

        case REGENERATE_FILTERS:

            // Función para verificar si el nombre cumple con el filtro
            const cumpleFiltro = (name, filtro) => name.toUpperCase().includes(filtro.name.toUpperCase());

            // Filtrar los videos segun filter names
            const videosFiltrados = state.allVideogames.filter(video =>
                state.filterNames.every(filtro => cumpleFiltro(video.name, filtro))
            );

            return {
                ...state,
                filteredVideogames: videosFiltrados
            };

        default:
            return { ...state }
    }
}
