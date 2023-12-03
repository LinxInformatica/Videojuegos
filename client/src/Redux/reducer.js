import FILTERTYPES from '../helpers/filterTypes.helper'

import {
    ADD_GENRES, ADD_PLATFORMS, ADD_VIDEOGAME, ADD_VIDEOGAMES,
    CLEAR_ALL, DEL_FILTER_NAME, GET_VIDEOGAMES_BY_NAME, LOADING, REGENERATE_FILTERS,
    GET_SELECTED_GENRES, SET_SELECTED_GENRES,
    SET_SELECTED_PLATFORMS, GET_SELECTED_PLATFORMS,
    SET_SELECTED_SOURCES, GET_SELECTED_SOURCES,
    SET_SELECTED_YEARS, GET_SELECTED_YEARS, PUT_SELECTED_GENRES, PUT_SELECTED_PLATFORMS, PUT_SELECTED_YEARS, PUT_SELECTED_SOURCES
} from "./actions-types";

const initialState = {
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
    allYears: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    allSources: ['Local Database', 'Api'],
    allOrders: ['Name Ascending', 'Name Descending', 'Released Ascending', 'Released Descending', 'First Local', 'First Api'],
    loading: true,
    filteredVideogames: [],
    // usados para filtrar FilteredVideoGames
    filterNames: [],
    filterPlatforms: [],
    filterGenres: [],
    filterYears: [],
    filterSources: [],
    //usados en los forms si confirma pasan a filter si no  los limpio
    selectedPlatforms: [],
    selectedGenres: [],
    selectedYears: [],
    selectedSources: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload,
                filteredVideogames: payload
            };

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
                selectedGenres: [],
                filterPlatforms: []
            }
        case ADD_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...allVideogames, payload]
            }

        case GET_SELECTED_GENRES:
            return {
                ...state,
                selectedGenres: [...state.filterGenres]
            }
        case SET_SELECTED_GENRES:
            let newSelectedGenres = []
            if (state.selectedGenres.find((genre) => genre.id === payload.id)) {
                newSelectedGenres = state.selectedGenres.filter((genre) => genre.id !== payload.id)
            } else {
                state.selectedGenres.push({ id: payload.id, name: payload.name })
                newSelectedGenres = state.selectedGenres
            }
            return {
                ...state,
                selectedGenres: [...newSelectedGenres]
            }
        case PUT_SELECTED_GENRES:

            return {
                ...state,
                filterGenres: [...state.selectedGenres]
            }


        case GET_SELECTED_PLATFORMS:
            return {
                ...state,
                selectedPlatforms: [...state.filterPlatforms]
            }

        case SET_SELECTED_PLATFORMS:
            let newSelectedPlatforms = []
            if (state.selectedPlatforms.find((platform) => platform.id === payload.id)) {
                newSelectedPlatforms = state.selectedPlatforms.filter((platform) => platform.id !== payload.id)
            } else {
                state.selectedPlatforms.push({ id: payload.id, name: payload.name })
                newSelectedPlatforms = state.selectedPlatforms
            }
            return {
                ...state,
                selectedPlatforms: [...newSelectedPlatforms]
            }
        case PUT_SELECTED_PLATFORMS:
            return {
                ...state,
                filterPlatforms: [...state.selectedPlatforms]
            }

        case GET_SELECTED_YEARS:
            return {
                ...state,
                selectedYears: [...state.filterYears]
            }

        case SET_SELECTED_YEARS:
            let newSelectedYears = []
            if (state.selectedYears.includes(payload)) {
                newSelectedYears = state.selectedYears.filter((year) => year !== payload)
            } else {
                state.selectedYears.push(payload)
                newSelectedYears = state.selectedYears
            }
            return {
                ...state,
                selectedYears: [...newSelectedYears]
            }
        case PUT_SELECTED_YEARS:
            return {
                ...state,
                filterYears: [...state.selectedYears]
            }


        case GET_SELECTED_SOURCES:
            return {
                ...state,
                selectedSources: [...state.filterSources]
            }

        case SET_SELECTED_SOURCES:
            let newSelectedSources = []
            if (state.selectedSources.includes(payload)) {
                newSelectedSources = state.selectedSources.filter((source) => source !== payload)
            } else {
                state.selectedSources.push(payload)
                newSelectedSources = state.selectedSources
            }
            return {
                ...state,
                selectedSources: [...newSelectedSources]
            }
        case PUT_SELECTED_SOURCES:
            return {
                ...state,
                filterSources: [...state.selectedSources]
            }


        default:
            return { ...state }
    }
}
