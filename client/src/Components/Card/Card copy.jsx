import { Link } from "react-router-dom";
import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
  const { id, name, image, released, rating, genres, source } = props
  //para saber si vino de la api o no 
  const api = source===1? false : true
  
  return (
    <div>
      <Link to={`/details/${id}`} className={styles.card}>
        <div>
          <div className={styles.imageContainer}>
            <img
              src={image}
              alt="Videogame Image"
              className={styles.cardImage}
            />
          </div>
          <img
            src={image}
            alt="Videogame Image"
            className={styles.cardImage}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.cardHeader}>{name}</div>
          <div className={styles.cardText}>
            {genres.map((genre) => (
              <div key={`genre_${genre.name}`}>{genre.name}</div>
            ))}
            <div>
              Released:{released}
            </div>
            <div>
              Rating:{rating}
            </div>
            {}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card