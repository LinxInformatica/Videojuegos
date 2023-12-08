import FILTERTYPES from '../helpers/filterTypes.helper'
import YEARS from '../helpers/years.helper';
import filterFunction from '../utils/filterFunction';

import {
    ADD_GENRES, ADD_PLATFORMS, ADD_VIDEOGAME, ADD_VIDEOGAMES,
    CLEAR_ALL, DEL_FILTER, LOADING,
    GET_SELECTED_FILTERS, SET_SELECTED_FILTERS, PUT_SELECTED_FILTERS, GET_VIDEOGAMES_FILTERED, SET_ALL_FILTERS, CLEAR_SELECTED_FILTERS, CLEAR_ALL_FILTERS

} from "./actions-types";

const initialState = {
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
    allYears: YEARS,
    allSources: [{ id: 1, name: 'Local Database' }, { id: 2, name: 'Api' }],
    allOrders: ['Name Ascending', 'Name Descending', 'Released Ascending', 'Released Descending', 'First Local', 'First Api'],
    loading: true,
    filteredVideogames: [],
    // usados para filtrar FilteredVideoGames
    allFilters: [],
    //usados en los forms de filters si confirma pasan a filter si no  los limpio
    selectedFilters: [],
    //usados en el form para saber que generos y platforms estan selecionados

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

        case DEL_FILTER:
            const newFilter = state.allFilters.filter((filter) => filter.uniqueId !== payload)
            return {
                ...state,
                allFilters: [...newFilter]
            };

        case CLEAR_ALL:
            return {
                ...state,
                loading: true,
                filteredVideogames: [],
                allFilters: []
            }
        case ADD_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...allVideogames, payload]
            }
        case CLEAR_ALL_FILTERS:
            return {
                ...state,
                allFilters: []
            }

        case GET_SELECTED_FILTERS:
            return {
                ...state,
                selectedFilters: [...state.allFilters]
            }

        case CLEAR_SELECTED_FILTERS:
            return {
                ...state,
                selectedFilters: []
            }
        case SET_SELECTED_FILTERS:
            let newSelectedFilters = []
            if (state.selectedFilters.find((selected) => selected.uniqueId === payload.uniqueId)) {
                newSelectedFilters = state.selectedFilters.filter((selected) => selected.uniqueId !== payload.uniqueId)
            } else {
                state.selectedFilters.push({ id: payload.id, name: payload.name, uniqueId: payload.uniqueId, type: payload.type })
                newSelectedFilters = state.selectedFilters
            }
            return {
                ...state,
                selectedFilters: [...newSelectedFilters]
            }

        case PUT_SELECTED_FILTERS:

            return {
                ...state,
                allFilters: [...state.selectedFilters],
                selectedFilters: []
            }

        case SET_ALL_FILTERS:
            return {
                ...state,
                allFilters: [...state.allFilters, payload]
            }
        case GET_VIDEOGAMES_FILTERED:
            let newVideogamesFiltered = state.allVideogames
            if (state.allFilters.length !== 0) {
                //filtro por name
                newVideogamesFiltered = filterFunction(newVideogamesFiltered, state.allFilters, FILTERTYPES.NAME)


                //filtro por genre
                newVideogamesFiltered = filterFunction(newVideogamesFiltered, state.allFilters, FILTERTYPES.GENRE)

                //filtro por platforms
                newVideogamesFiltered = filterFunction(newVideogamesFiltered, state.allFilters, FILTERTYPES.PLATFORM)

                //filtro por year
                newVideogamesFiltered = filterFunction(newVideogamesFiltered, state.allFilters, FILTERTYPES.YEAR)

                //filtro por source
                newVideogamesFiltered = filterFunction(newVideogamesFiltered, state.allFilters, FILTERTYPES.SOURCE)
            }
            console.log(newVideogamesFiltered)
            return {
                ...state,
                filteredVideogames: [...newVideogamesFiltered]
            };


        default:
            return { ...state }
    }
}
