//llena allvideogames y filtered
export const ADD_VIDEOGAMES = 'ADD_VIDEOGAMES';
//llena genres
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
//llena platforms
export const GET_ALL_PLATFORMS = 'GET_ALL_PLATFORMS';

//quita el filtro seleciconado en filters
export const DEL_FILTER = 'DEL_FILTER';
//quita todos los filters en filters
export const DEL_ALL_FILTERS = 'DEL_ALL_FILTERS';


export const LOADING = 'LOADING';

//
export const CLEAR_ALL = 'CLEAR_ALL';

//agrega el videogame grabado en allvideogames
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
//BORRO EL VIDEOGAME despues de borrar
export const DEL_VIDEOGAME = 'DEL_VIDEOGAME';


//limpia selectedfitlers cuando salgo sin selecionar nada en selectedfilters
//o cuando hago click en selectedfilter ClearAll lo paso con payload
//para que filtre solo los que tienen ese type
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';
//cuando hago click en selectedfilter SelectAll lo paso con payload
//para que agregoe a selected filters los de ese type
export const SELECT_ALL_SELECTED_FILTERS = 'SELECT_ALL_SELECTED_FILTERS';

//
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';

//cuando ingreso a selectedfilters que me traiga los filters
export const GET_SELECTED_FILTERS = 'GET_SELECTED_FILTERS';
//activo o desactivo selectedfilters
export const SET_SELECTED_FILTERS = 'SET_SELECTED_FILTERS';
//si doy ok en selectedfilters que agregue lo selcionado a filters
export const PUT_SELECTED_FILTERS = 'PUT_SELECTED_FILTERS';

//para agregar a filters lo que viene del search
export const SET_ALL_FILTERS = 'SET_ALL_FILTERS';

//armo el filtro general
export const GET_VIDEOGAMES_FILTERED = 'GET_VIDEOGAMES_FILTERED';

//cuando ingreso a selectedORDERS que me traiga los ORDERS
export const GET_SELECTED_ORDERS = 'GET_SELECTED_ORDERS';
//activo o desactivo selectedORDERS
export const SET_SELECTED_ORDERS = 'SET_SELECTED_ORDERS';
//si doy ok en selectedfilters que agregue lo selcionado a ORDERS
export const PUT_SELECTED_ORDERS = 'PUT_SELECTED_ORDERS';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_OF_PAGES = 'SET_TOTAL_OF_PAGES'

export const GET_SETUP = 'GET_SETUP';
export const POST_SETUP = 'POST_SETUP'



