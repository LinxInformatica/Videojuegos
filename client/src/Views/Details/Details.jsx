import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from './Details.module.css'

const Details = () => {
  const { id } = useParams()

  const videogame = useSelector((state) => {
    state.allVideogames.find((v) => v.id === id)
  })
  const { name, description, image, released, genres, platforms, source } = videogame

  return (
    <div className={styles.details}>
      <Link to={SITEROUTES.LANDING} >
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt="Videogame Image"
            className={styles.detailsImage}
          />
        </div>
        <img
          src={image}
          alt="Videogame Image"
          className={styles.detailsImage}
        />
      </Link>
      <div className={styles.details}>
        <div className={styles.detailsHeader}>{name}</div>
        <div className={styles.detailsText}>
          {genres.map((genre) => (
            <div>{genre.name}</div>
          ))}
        </div>
        <div>
          {platforms.map((platform) => (
            <div>{platform.name}</div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Details