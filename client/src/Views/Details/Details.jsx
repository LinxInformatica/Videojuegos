import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from '../../Styles/styles.module.css'
import axios from 'axios'

const Details = () => {
  const { id } = useParams()
  console.log(id)
  const [videogame, setVideogame] = useState({})

  useEffect(() => {
    const fetchVideogame = async () => {
      try {
        const response = await axios(`${SITEROUTES.VIDEOGAMES}/${id}`)
        const {data} = response
        if (data[0].name) {
          setVideogame(data[0])
        } else {
          window.alert('No videogame');
          setVideogame({})
        }
      } catch (error) {
        window.alert(error);

      }
    }
    fetchVideogame()

  }, [id]);

  const { name, description, image, released, genres, platforms, source } = videogame
  return (
    <div>
      <Link to={SITEROUTES.HOME} >
        {videogame.name &&
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
            {/* <div >
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

          </div> */}

          </div>
        }
      </Link>

    </div>
  )
}

export default Details