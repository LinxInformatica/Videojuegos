import React from 'react'
import styles from './Filter.module.css'
import { useDispatch } from 'react-redux'
import FILTERTYPES from '../../helpers/filterTypes.helper'
import { delFilterName, regenerateFilters } from '../../Redux/actions'

const Filter = (props) => {
  const { name, type } = props

  const dispatch = useDispatch()

  const onDelete = ({name,type}) => {
    console.log(name)
    switch (type) {
      case FILTERTYPES.NAME:
        dispatch(delFilterName(name))
        break;

      default:
        break;
    }
    dispatch(regenerateFilters())
  }

  return (
    <div className={styles.Filter}>
      <div className={styles.Filter_name}>{type}:{name}</div>
      <div>
        <button className={styles.buttonCard} onClick={() => onDelete({name:name,type:type})}>X</button>
      </div>
    </div>
  )
}

export default Filter