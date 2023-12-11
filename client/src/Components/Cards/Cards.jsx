import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from '../../Styles/styles.module.css'
import Filters from '../Filters/Filters'
import Searchbar from '../Searchbar/Searchbar'
import Orders from '../Orders/Orders'
import { getVideogamesFiltered } from '../../Redux/actions'
import Paginator from '../Paginator/Paginator'
import PAGINATOR from '../../helpers/paginator.helper'

const Cards = () => {
    const allVideogames= useSelector((state) => state.allVideogames)
    const allFilters=useSelector((state) => state.allFilters)
    const allOrders=useSelector((state) => state.allOrders)
    const currentPage=useSelector((state) => state.currentPage)
    const page_size=useSelector((state)=> state.page_size)
    const fisrtItem=(currentPage-1)*page_size
    const lastItem=fisrtItem+page_size

    const dispatch=useDispatch()

    const filteredVideogames = useSelector((state) => state.filteredVideogames)
    const videogames=filteredVideogames.slice(fisrtItem,lastItem)

    const noVideogames = videogames.length === 0
    console.log(videogames.length)
    console.log(noVideogames)

    useEffect(()=>{
        dispatch(getVideogamesFiltered());
    },[allFilters,allOrders,allVideogames])

    return (
        <div >
            <div>
                <Searchbar />
            </div>
            <div>
                <Paginator />
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