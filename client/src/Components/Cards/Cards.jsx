import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'


const Cards = () => {
    const videogames = useSelector((state) => state.filteredVideogames)
    
    return (
        <div>
            Videogames
            {videogames.map((videogame) => (
                <Card key={videogame.id}
                    id={videogame.id}
                    name={videogame.name}
                />))
            }

        </div>
    )
}

export default Cards