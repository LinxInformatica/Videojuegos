import React from 'react'
import styles from './Filter.module.css'
import { useDispatch } from 'react-redux'
import FILTERTYPES from '../../helpers/filterTypes.helper'
import { delFilterName, regenerateFilters } from '../../Redux/actions'

const Filter = (props) => {
  const { name, type } = props

  const dispatch = useDispatch()

  const onDelete = ({ name, type }) => {
    switch (type) {
      case FILTERTYPES.NAME:
        dispatch(delFilterName(name))
        break;

      default:
        break;
    }
    dispatch(regenerateFilters())
  }
  const value = `${type} contains ${name}`
  return (
    <div className={styles.filterContainer}>
      <div className={styles.columnContainer}>
      <input className={styles.text} name={name} type='text' value={value} disabled={true}></input>
      <button className={styles.button} onClick={() => onDelete({ name: name, type: type })}>❌</button>
    </div>
    </div>
  )
}

export default Filter


