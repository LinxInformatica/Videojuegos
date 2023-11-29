import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from './Cards.module.css'

const Cards = () => {
    const videogames = useSelector((state) => state.filteredVideogames)
    console.log(videogames)
    return (
        <div className={styles.Cards}>
            {videogames.map((videogame) => (
                <Card key={videogame.id}
                    id={videogame.id}
                    name={videogame.name}
                    description={videogame.description}
                    image={videogame.image}
                    released={videogame.released}
                    rating={videogame.rating}
                    genres={videogame.genres}
                    platforms={videogame.platforms}

                />))
            }

        </div>
    )
}

export default Cards