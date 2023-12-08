import React from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch } from 'react-redux'
import { delFilter, getVideogamesFiltered } from '../../Redux/actions'
import FILTERTYPES from '../../helpers/filterTypes.helper'

const Filter = (props) => {
  const { id, name, type, uniqueId } = props

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(delFilter(uniqueId))
    dispatch(getVideogamesFiltered())
  }
  const value = type === FILTERTYPES.NAME ? `${type} contains ${name}` : `${type} is ${name}`
  return (
    <div className={styles.filter}>
      <button className={styles.filterButton} >
        <span>{value}</span>
        <span onClick={onDelete}>❌</span>
      </button>
    </div >
  )
}

export default Filter


