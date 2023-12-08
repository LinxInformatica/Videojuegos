import { useSelector } from "react-redux";
import FILTERTYPES from "../helpers/filterTypes.helper";
import yearFecha from "./yearFecha";

const filterFunction = (videogames, allFilters, type) => {
    //armo un array con el criterio de busqueda (genre, name etc)
    const filters = allFilters.filter((filter) => filter.type === type)

    switch (type) {
        case FILTERTYPES.NAME:
            // busqueda de nombres
            return videogames.filter(videogame => {
                return filters.every(filter => {
                    const nameId = filter.id;
                    return videogame.name.toUpperCase().includes(nameId.toUpperCase())
                });
            });
            break;
        case FILTERTYPES.GENRE:
            // busqueda de genres
            return videogames.filter(videogame => {
                return filters.every(filter => {
                    const genreId = filter.id;
                    return videogame.genres.some(genre => genre.id === genreId);
                });
            });
            break;
        case FILTERTYPES.PLATFORM:
            // busqueda de platformrs
            return videogames.filter(videogame => {
                return filters.every(filter => {
                    const platformId = filter.id;
                    return videogame.platforms.some(platform => platform.id === platformId);
                });
            });
            break;
        case FILTERTYPES.YEAR:
            // busqueda de years 
            return videogames.filter(videogame => {
                return filters.every(filter => {
                    const releasedId = filter.id;
                    return yearFecha(videogame.released) === releasedId;
                })
            });
            break;
        case FILTERTYPES.SOURCE:
            // busqueda de origenes
            return videogames.filter(videogame => {
                return filters.every(filter => {
                    const sourceId = filter.id;
                    return videogame.source === sourceId;
                })
            });
            break;
        default:
            break;
    }

}

export default filterFunction