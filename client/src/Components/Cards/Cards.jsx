import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from '../../Styles/styles.module.css'
import Filters from '../Filters/Filters'
import Searchbar from '../Searchbar/Searchbar'
import Orders from '../Orders/Orders'
import { getVideogamesFiltered } from '../../Redux/actions'

const Cards = () => {
    const allVideogames= useSelector((state) => state.allVideogames)
    const videogames = useSelector((state) => state.filteredVideogames)
    const allFilters=useSelector((state) => state.allFilters)
    const allOrders=useSelector((state) => state.allOrders)

    const noVideogames = videogames.length === 0
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getVideogamesFiltered());
    },[allFilters,allOrders,allVideogames])

    return (
        <div >
            <div>
                <Searchbar />
            </div>
            <div>
                <Orders />
            </div>
            <div>
                <Filters />
            </div>
            <div className={styles.cards}>
                {noVideogames
                    ? ( 
                        <label className={styles.noFound}>No Videogames found!</label>
                    )
                    : (
                        videogames.map((videogame) => (
                            <Card key={videogame.id}
                                id={videogame.id}
                                name={videogame.name}
                                description={videogame.description}
                                image={videogame.image}
                                released={videogame.released}
                                rating={videogame.rating}
                                genres={videogame.genres}
                                platforms={videogame.platforms}
                                source={videogame.source}

                            />))
                    )
                }


            </div>
        </div>

    )
}

export default Cards