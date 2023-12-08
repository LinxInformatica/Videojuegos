import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import { useDispatch } from 'react-redux'
import { clearAll } from '../../Redux/actions'
import styles from '../../Styles/Styles.module.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleOnClick = () => {
    dispatch(clearAll())
    navigate('/')
  }
  
  return (
    <div>
      <div className={styles.navbar}>

        <Link to={SITEROUTES.HOME}>
          <button>Videogames</button>
        </Link>

        <Link to={SITEROUTES.FORM}>
          <button>New Videogame</button>
        </Link>
        <Link to={SITEROUTES.SELECT_FILTERS}>
          <button>Select Filters</button>
        </Link>

        <button onClick={handleOnClick}>Exit!</button>

      </div>
      
    </div>

  )
}

export default Navbar