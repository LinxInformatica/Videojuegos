import { Link } from "react-router-dom";
import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
  const { id, name, description, image, released, rating, genres, platforms } = props
  return (
    <div className={styles.card}>
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
      <div className={styles.details}>
        <div className={styles.cardHeader}>{name}</div>
        <div className={styles.cardText}>
          {genres.map((genre) => (
            <div>{genre.name}</div>
          ))}

        </div>
        {/* <div className={styles.button}>Learn More</div> */}
      </div>
      {/* <Link to={`/details/${id}`}>
        <div className={styles.button}>Learn More</div>
      </Link> */}

    </div>
  )
}

export default Card