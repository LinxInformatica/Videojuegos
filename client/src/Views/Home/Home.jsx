import React from 'react'
import styles from './Home.module.css'
import Cards from '../../Components/Cards/Cards'

const Home = () => {
  return (
    <div className={styles.Home}>
      <div><Cards /></div>
    </div>
  )
}

export default Home