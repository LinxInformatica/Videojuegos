import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import { useDispatch } from 'react-redux'
import { clearAll } from '../../Redux/actions'
import styles from '../../Styles/Styles.module.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {pathname} = useLocation()
  
  const handleOnClick = () => {
    dispatch(clearAll())
    navigate('/')
  }
  
  return (
    <div>
      <div className={styles.navbar}>

        <Link to={SITEROUTES.HOME}>
          <button className={pathname===SITEROUTES.HOME? styles.selected: styles.unselected}>Videogames</button>
        </Link>

        <Link to={SITEROUTES.FORM}>
          <button className={pathname===SITEROUTES.FORM? styles.selected: styles.unselected}>New Videogame</button>
        </Link>
        <Link to={SITEROUTES.SELECT_ORDERS}>
          <button className={pathname===SITEROUTES.SELECT_ORDERS? styles.selected: styles.unselected}>Select Orders</button>
        </Link>
        <Link to={SITEROUTES.SELECT_FILTERS}>
          <button className={pathname===SITEROUTES.SELECT_FILTERS? styles.selected: styles.unselected}>Select Filters</button>
        </Link>
        <Link to={SITEROUTES.FORMSETUP}>
          <button className={pathname===SITEROUTES.FORMSETUP? styles.selected: styles.unselected}>Setup</button>
        </Link>
        
        <button onClick={handleOnClick}>Exit!</button>

      </div>
      
    </div>

  )
}

export default Navbar