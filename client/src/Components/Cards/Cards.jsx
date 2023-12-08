import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from '../../Styles/styles.module.css'
import Filters from '../Filters/Filters'
import Searchbar from '../Searchbar/Searchbar'

const Cards = () => {
    const videogames = useSelector((state) => state.filteredVideogames)
    const noVideogames = videogames.length === 0

    return (
        <div >
            <div>
                <Searchbar />
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