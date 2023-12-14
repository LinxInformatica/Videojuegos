import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import styles from './Card.module.css'
import formatDate from "../../utils/formatDate";
import SITEROUTES from "../../helpers/siteroutes.helper";


const Card = (props) => {
  const { id, name, image, released, rating, genres, source, platforms } = props
  //para saber si vino de la api o no 
  const api = source === 1 ? false : true
  const date = formatDate(released)
  
  const imageURL = api ? image : `${SITEROUTES.IMAGES}${image}`
  return (
    <div >
      <Link to={`/details/${id}`} className={styles.card}>
        <div>
          <label className={styles.rating}>Rating:{rating}</label>
          <label className={styles.released}>{date}</label>
          <label className={styles.source}>{api ? 'API' : 'LOCAL'}</label>
          <img
            src={imageURL}
            alt={imageURL}
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