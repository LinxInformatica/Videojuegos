//import action types

import FILTERTYPES from "../helpers/filterTypes.helper";
import { ADD_GENRES, ADD_PLATFORMS, ADD_VIDEOGAME, ADD_VIDEOGAMES, CLEAR_ALL, DEL_FILTER_NAME, GET_VIDEOGAMES_BY_NAME, LOADING, REGENERATE_FILTERS } from "./actions-types";

const initialState = {
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
    allReleased: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    allSources: ['BD Local', 'Api'],
    allOrders: ['Name Ascending', 'Name Descending', 'Released Ascending', 'Released Descending', 'First Local', 'First Api'],
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
            const orderedGenres = payload.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1
            })
            return { ...state, allGenres: orderedGenres };

        case ADD_PLATFORMS:
            const orderedPlatforms = payload.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1
            })
            return { ...state, allPlatforms: orderedPlatforms };

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

            // para verificar si el nombre cumple con el filtro
            const filtroName = (name, filtro) => name.toUpperCase().includes(filtro.name.toUpperCase());

            // filtro los videos segun filter names
            const videosFiltrados = state.allVideogames.filter(video =>
                state.filterNames.every(filtro => filtroName(video.name, filtro))
            );

            return {
                ...state,
                filteredVideogames: videosFiltrados
            };

        case CLEAR_ALL:
            return {
                ...state,
                loading: true,
                filteredVideogames: [],
                filterNames: [],
                filterGenres: [],
                filterPlatforms: []
            }
        case ADD_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...allVideogames, payload]
            }

        default:
            return { ...state }
    }
}
