import React, { useEffect, useState } from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedOrders } from '../../Redux/actions'

const SelectOrder = (props) => {
  const { id, name, order, field } = props
  const dispatch = useDispatch()
  //tomo los generos seleccionados

  const handleOnClick = (event) => {
    event.preventDefault();
    dispatch(setSelectedOrders(props))
  }
  
  return (
    <div className={styles.container}>
      <button
        className={styles.unselected}
        onClick={handleOnClick}>
        {name}
      </button>
    </div>
  )
}

export default SelectOrder