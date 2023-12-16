// testing
import { describe, test, vi, expect } from "vitest";

import rootReducer from "../../src/Redux/reducer";
//import "@testing-library/jest-dom";
//import * as data from "../db.json";

// actions types
import { DEL_ALL_FILTERS, SET_TOTAL_OF_PAGES, SET_CURRENT_PAGE, SET_PAGE_SIZE } from "../../src/Redux/actions-types"
import YEARS from "../../src/helpers/years.helper";
import SOURCES from "../../src/helpers/sources.helper";
import ORDERS from "../../src/helpers/orders.helper";

vi.mock("../", () => ({
  __esModule: true,
  DEL_ALL_FILTERS,

  delAllFilters: (payload) => ({
    type: DEL_ALL_FILTERS
  }),
}));
const estado = {
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

let result = estado

describe("Reducer", () => {
  test("Si no existe un action.type, debe devolver el estado sin cambios", () => {
    const reducerContent = rootReducer(undefined, { type: "NO_EXISTE" });
    expect(reducerContent).toStrictEqual(estado);

  });
  test(`Cuando la action-type es "SET_PAGE_SIZE" debe guardar, en estado "page_size" 
        y con total of pages calcularla cantidad de paginas`, () => {
    result = rootReducer(estado, {
      type: SET_PAGE_SIZE,
      payload: 20,
    });
    expect(result.page_size).toEqual(20);
  });
  test(`con "TOTAL_OF_PAGES" calcular la cantidad de paginas`, () => {
    result = rootReducer(result, {
      type: SET_TOTAL_OF_PAGES,
      payload: 105, //cantidad total de items
    });
    expect(result.totalOfPages).toEqual(6);
  });
  test(`con "SET_CURRENT_PAGE" calcular la current_page`, () => {
    result = rootReducer(result, {
      type: SET_CURRENT_PAGE,
      payload: 2, //cantidad total de items
    });
    expect(result.currentPage).toEqual(2);
  });
  test(`con "SET_CURRENT_PAGE" calcular la current_page si es menor a 1 devuelve 1`, () => {
    result = rootReducer(result, {
      type: SET_CURRENT_PAGE,
      payload: -1,
    });
    console.log(result)
    expect(result.currentPage).toEqual(1);
  });
  test(`con "SET_CURRENT_PAGE" calcular la current_page si es mayor la maxima devuelve la maxima`, () => {
    result = rootReducer(result, {
      type: SET_CURRENT_PAGE,
      payload: 150,
    });
    expect(result.currentPage).toEqual(6);
  });

})

