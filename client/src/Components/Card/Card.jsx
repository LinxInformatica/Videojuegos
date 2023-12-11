import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import styles from './Card.module.css'
import formatDate from "../../utils/formatDate";

const Card = (props) => {
  const { id, name, image, released, rating, genres, source, platforms } = props
  //para saber si vino de la api o no 
  const api = source === 1 ? false : true
  const date = formatDate(released)

  const [blogImage, setBlogImage] = useState(null)

  //por si la image es blob y hay que convertir 
  useEffect(() => {
    if (!api) {
      console.log(image)
      fetch(image)
        .then(response => response.blob())
        .then(data => {
          const objectURL = URL.createObjectURL(data)
          console.log(objectURL)
          setBlogImage(objectURL)
        })
        .catch(error => {
          console.log('Error loading image')
        })
    } else {
      setBlogImage(image)
    }
  }, [])

  return (
    <div >
      <Link to={`/details/${id}`} className={styles.card}>
        <div>
          <label className={styles.rating}>Rating:{rating}</label>
          <label className={styles.released}>{date}</label>
          <label className={styles.source}>{api ? 'API' : 'LOCAL'}</label>
          <img
            src={blogImage}
            alt={blogImage}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardHeader}>{name}</div>
        <div className={styles.details}>
          {/* <div className={styles.cardText}> */}
          {genres.map((genre) => (
            <div key={`genre_${genre.name}`}>{genre.name}</div>
          ))}
        </div>
      </Link>
    </div>
  )
}

export default Card