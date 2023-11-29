import React from 'react'
import Genres from '../../Components/Genres/genres'
import Platforms from '../../Components/Platforms/Platforms'
import styles from './Landing.module.css'

import Cards from '../../Components/Cards/Cards'

const Landing = () => {
  return (
    <div className={styles.Landing}>Landing
      <div><Cards /></div>
    </div>
  )
}

export default Landing