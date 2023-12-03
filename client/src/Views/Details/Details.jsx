import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from './Details.module.css'

const Details = () => {
  // obtengo params - rrd
  const { id } = useParams()

  //obtengo el videoggam filtrado -rr
  const videogame = useSelector((state) => state.allVideogames.find((v) => v.id.toString() === id))

  const { name, description, image, released, genres, platforms, source } = videogame
  return (
    <div>
      <Link to={SITEROUTES.LANDING} >

        <div className={styles.details}>
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
          {/* <div className={styles.details}> */}
          <div >
            <div className={styles.detailsHeader}>{name}</div>
            <div className={styles.detailsText}>
              {genres.map((genre) => (
                <div key={`genre_${genre.name}`}>{genre.name}</div>
              ))}
            </div>
            <div>
              {platforms.map((platform) => (
                <div key={`platform_${platform.name}`}>{platform.name}</div>
              ))}

            </div>

          </div>

        </div>
      </Link>

    </div>
  )
}

export default Details