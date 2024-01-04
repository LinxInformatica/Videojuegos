import FILTERTYPES from '../helpers/filterTypes.helper'
import ORDERS from '../helpers/orders.helper';
import PAGINATOR from '../helpers/paginator.helper';
import SOURCES from '../helpers/sources.helper';
import YEARS from '../helpers/years.helper';
import filterFunction from '../utils/filterFunction';
import formatName from '../utils/formatName';
import orderFunction from '../utils/orderFunction';

import {
    GET_ALL_GENRES, GET_ALL_PLATFORMS, ADD_VIDEOGAME, ADD_VIDEOGAMES,
    CLEAR_ALL, DEL_FILTER, LOADING,
    GET_SELECTED_FILTERS, SET_SELECTED_FILTERS, PUT_SELECTED_FILTERS, GET_VIDEOGAMES_FILTERED, SET_ALL_FILTERS, CLEAR_SELECTED_FILTERS, CLEAR_ALL_FILTERS, SELECT_ALL_SELECTED_FILTERS, PUT_SELECTED_ORDERS, SET_SELECTED_ORDERS, GET_SELECTED_ORDERS, DEL_VIDEOGAME, SET_CURRENT_PAGE, SET_TOTAL_OF_PAGES, GET_SETUP, SET_PAGE_SIZE, DEL_ORDER, LANDING, CHANGE_ORDER, SET_VIDEOGAME

} from "./actions-types";

const initialState = {
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
    allYears: YEARS,
    allSources: SOURCES,
    posibleOrders: ORDERS,
    loading: false,
    landing: false,
    filteredVideogames: [],     // usados para filtrar FilteredVideoGames
    allFilters: [],  //usados en los forms de filters si confirma pasan a filter si no  los limpio
    allOrders: [],  //usados en los forms de orders si confirma pasan a filter si no  los limpio
    selectedFilters: [],   //usados en el form para saber que generos y platforms estan selecionados
    selectedOrders: [],
    totalOfPages: 0,
    currentPage: 1,
    page_size: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload,
                filteredVideogames: payload
            };

        case GET_ALL_GENRES:
            const orderedGenres = payload.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1
            })
            return { ...state, allGenres: orderedGenres };

        case GET_ALL_PLATFORMS:
            const orderedPlatforms = payload.sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1
            })
            return {
                ...state,
                allPlatforms: orderedPlatforms
            };

        case LOADING:
            return {
                ...state,
                loading: payload
            };

        case LANDING:
            return {
                ...state,
                landing: payload
            };

        case DEL_FILTER:
            const newFilter = state.allFilters.filter((filter) => filter.uniqueId !== payload)
            return {
                ...state,
                allFilters: [...newFilter]
            };

        case DEL_ORDER:
            const delOrder = state.allOrders.filter((order) => order.id !== payload)
            return {
                ...state,
                allOrders: [...delOrder]
            };

        case CHANGE_ORDER:
            //busco por payload el order a cambiar
            const orderActual = ORDERS.find((order) => order.id === payload)
            //busco el objeto next
            const nextOrder = ORDERS.find((order) => order.id === orderActual.nextId)
            //cambio el objeto viejo pro el nuevo
            const newOrder = state.allOrders.map((order) => order.id === payload ? nextOrder : order)
            return {
                ...state,
                allOrders: [...newOrder]
            };

        case CLEAR_ALL:
            return {
                ...state,
                landing: true,
                loading: false,
            }
        case ADD_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...state.allVideogames, payload]
            }

        case DEL_VIDEOGAME:
            return {
                ...state,
                allVideogames: [...state.allVideogames.filter((videogame) => videogame.id !== payload)]
            }

        case SET_VIDEOGAME:
            const index = state.allVideogames.findIndex((videogame) => videogame.id === payload.id)
            state.allVideogames[index] = payload
            return {
                ...state,
                allVideogames: [...state.allVideogames]
            }

        case CLEAR_ALL_FILTERS:
            return {
                ...state,
                allFilters: [],
                currentPage: 1
            }


        case CLEAR_SELECTED_FILTERS:
            let newClearSelectedFilters = []
            if (payload) {
                newClearSelectedFilters = state.selectedFilters.filter((filter) => filter.type !== payload)
            }
            return {
                ...state,
                selectedFilters: [...newClearSelectedFilters]
            }
        case SELECT_ALL_SELECTED_FILTERS:
            // filtro los selecterdfiltered con ese type
            const seletedFiltered = state.selectedFilters.filter((sel) => sel.type !== payload);

            //funcion para devolver formateado el objeto
            const formatFilter = (filter) => {
                return {
                    id: filter.id,
                    name: formatName(filter.name,payload),
                    type: payload,
                    uniqueId: `${payload}${filter.id}`,
                    order: filter.order
                }
            }
            let newFilterType = []
            if (payload === FILTERTYPES.GENRE) {
                newFilterType = state.allGenres.map((filter) => formatFilter(filter))
            } else if (payload === FILTERTYPES.PLATFORM) {
                newFilterType = state.allPlatforms.map((filter) => formatFilter(filter))
            } else if (payload === FILTERTYPES.SOURCE) {
                newFilterType = state.allSources.map((filter) => formatFilter(filter))
            } else if (payload === FILTERTYPES.YEAR) {
                newFilterType = state.allYears.map((filter) => formatFilter(filter))
            }
            return {
                ...state,
                selectedFilters: [...seletedFiltered, ...newFilterType]
            }

        case GET_SELECTED_FILTERS:

            return {
                ...state,
                selectedFilters: [...state.allFilters]
            }

        case SET_SELECTED_FILTERS:
            let newSelectedFilters = []
            if (state.selectedFilters.find((selected) => selected.uniqueId === payload.uniqueId)) {
                newSelectedFilters = state.selectedFilters.filter((selected) => selected.uniqueId !== payload.uniqueId)
            } else {
                state.selectedFilters.push({
                    id: payload.id,
                    name: formatName(payload.name,payload.type),
                    uniqueId: payload.uniqueId,
                    type: payload.type,
                    order: payload.order
                })
                newSelectedFilters = state.selectedFilters
            }
            return {
                ...state,
                selectedFilters: [...newSelectedFilters]
            }

        case PUT_SELECTED_FILTERS:
            state.selectedFilters.sort((a, b) => {
                if (a.order + a.name < b.order + b.name) return -1
                return 1
            })
            return {
                ...state,
                allFilters: [...state.selectedFilters],
                selectedFilters: []
            }

        case SET_ALL_FILTERS:
            const orderedAllFilters = [...state.allFilters, payload]
            orderedAllFilters.sort((a, b) => {
                if (a.order + a.name < b.order + b.name) return -1
                return 1
            })
            return {
                ...state,
                allFilters: [...orderedAllFilters]
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
            //ordeno 
            const newVideogamesOrdered = orderFunction(newVideogamesFiltered, state.allOrders)

            return {
                ...state,
                filteredVideogames: [...newVideogamesOrdered]
            }

        case GET_SELECTED_ORDERS:

            return {
                ...state,
                selectedOrders: [...state.allOrders]
            }

        case SET_SELECTED_ORDERS:

            let newSelectedOrders = []
            //busco el id
            let orderExists = state.selectedOrders.find((selected) => selected.id === payload.id)
            if (orderExists) {
                //si encuento el id lo borro
                newSelectedOrders = state.selectedOrders.filter((selected) => selected.id !== payload.id)
            } else {
                //busco un order con el mismno field
                orderExists = state.selectedOrders.find((selected) => selected.field === payload.field)
                if (orderExists) {
                    //si encuento con el mismo filed lo remplazo
                    newSelectedOrders = state.selectedOrders.map((order) => order.id === orderExists.id ? payload : order)
                } else {
                    //si no lo encuentro al id ni al field lo agrego
                    state.selectedOrders.push(payload)
                    newSelectedOrders = state.selectedOrders
                }
            }
            return {
                ...state,
                selectedOrders: [...newSelectedOrders]
            }

        case PUT_SELECTED_ORDERS:

            return {
                ...state,
                allOrders: [...state.selectedOrders],
                selectedOrders: []
            }

        case SET_TOTAL_OF_PAGES:
            //por si viene =0 uso helper de paginator
            const page_items = state.page_size <= 0 ? PAGINATOR.PAGE_SIZE : state.page_size
            const totalOfPages = Math.ceil(payload / page_items)
            const current= (state.currentPage==0 || state.currentPage>totalOfPages)? 1 : state.currentPage
            return {
                ...state,
                currentPage: current,
                totalOfPages: totalOfPages,
            }

        case SET_CURRENT_PAGE:
            let page = payload
            if (isNaN(page)) {
                // si no es numero
                switch (page) {
                    case PAGINATOR.FIRST:
                        page = 1
                        break;
                    case PAGINATOR.PREV:
                        page = state.currentPage - 1
                        break;
                    case PAGINATOR.NEXT:
                        page = state.currentPage + 1
                        break;
                    case PAGINATOR.LAST:
                        page = state.totalOfPages
                        break;
                    default:
                        break;
                }
            }
            if (page <= 0) page = 1
            if (page > state.totalOfPages) page = state.totalOfPages
            return {
                ...state,
                currentPage: parseInt(page)
            }

        case GET_SETUP:
            const { page_size, filters, orders } = payload
            //convierte de texto a array de obj
            const allFilters = JSON.parse(filters)
            const allOrders = JSON.parse(orders)
            return {
                ...state,
                page_size: page_size,
                allFilters: allFilters,
                allOrders: allOrders
            }
        case SET_PAGE_SIZE:
            return {
                ...state,
                page_size: payload
            }

        default:
            return { ...state }
    }
}
