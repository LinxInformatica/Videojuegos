//import action types

import { ADD_GENRES, ADD_PLATFORMS, ADD_VIDEOGAMES, LOADING } from "./actions-types";

const initialState = {
    allVideogames: [],
    filteredVideogames: [],
    allGenres: [],
    allPlatforms: [],
    loading: true
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

        default:
            return { ...state }
    }
}
