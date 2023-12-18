import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import { useDispatch } from 'react-redux'
import { clearAll } from '../../Redux/actions'
import styles from '../../Styles/Styles.module.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleOnClick = () => {
    dispatch(clearAll())
    navigate('/')
  }
  const isDetail = pathname.substring(0, SITEROUTES.DETAIL.length) === SITEROUTES.DETAIL ? true : false
  const isEditing = pathname.substring(0, SITEROUTES.PATHFORM_EDIT.length) === SITEROUTES.PATHFORM_EDIT ? true : false
  const isNew = pathname === SITEROUTES.FORM ? true : false

  return (
    <div>
      <div className={styles.navbar}>

        <Link to={SITEROUTES.HOME}>
          <button className={pathname === SITEROUTES.HOME ? styles.selected : styles.unselected}>Videogames</button>
        </Link>
        {(!isNew && !isDetail && !isEditing) && (
          <>
            <Link to={SITEROUTES.FORM}>
              <button className={pathname === SITEROUTES.FORM ? styles.selected : styles.unselected}>New Videogame</button>
            </Link>
            <Link to={SITEROUTES.SELECT_ORDERS}>
              <button className={pathname === SITEROUTES.SELECT_ORDERS ? styles.selected : styles.unselected}>Select Orders</button>
            </Link>
            <Link to={SITEROUTES.SELECT_FILTERS}>
              <button className={pathname === SITEROUTES.SELECT_FILTERS ? styles.selected : styles.unselected}>Select Filters</button>
            </Link>
            <Link to={SITEROUTES.FORMSETUP}>
              <button className={pathname === SITEROUTES.FORMSETUP ? styles.selected : styles.unselected}>Setup</button>
            </Link>
          </>
        )
        }
        {isNew &&
          <button className={styles.selected}>New Videogame</button>
        }

        {isDetail &&
          <button className={styles.selected}> Videogame Detail</button>
        }

        {isEditing &&
          <button className={styles.selected}> Editing Videogame</button>
        }

        <button className={styles.unselected} onClick={handleOnClick}>Exit!</button>

      </div>

    </div>

  )
}

export default Navbar