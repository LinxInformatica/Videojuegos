import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import { Link, useNavigate } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import { useDispatch } from 'react-redux'
import { clearAll } from '../../Redux/actions'

const Navbar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleOnClick = () => {
    dispatch(clearAll())
    navigate('/')
  }
  return (
    <div>
      <Link to={SITEROUTES.FORM}>
        <button>New Videogame</button>
      </Link>
      <Link to={SITEROUTES.ADD_FILTERS}>
        <button>Add Filter</button>
      </Link>
      <button onClick={handleOnClick}>Restart</button>
      <div>
        <Searchbar />
      </div>

    </div>


  )
}

export default Navbar