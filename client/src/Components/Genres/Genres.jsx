import React from 'react'
import { useSelector } from 'react-redux'
import Genre from '../Genre/Genre'

const Genres = () => {
    const genres = useSelector((state) => state.allGenres)
    
    return (
        <div>
            Genres
            {genres.map((genre) => (
                <Genre key={genre.id}
                    id={genre.id}
                    name={genre.name}
                />))
            }

        </div>
    )
}

export default Genres