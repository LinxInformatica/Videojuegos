import React from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch } from 'react-redux'
import { delFilter } from '../../Redux/actions'

const Order = (props) => {
  const { id, name, type, field } = props

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(delFilter(uniqueId))
  }
  
  return (
    <div className={styles.filter}>
      <button className={styles.filterButton} >
        <span>{name}</span>
        <span onClick={onDelete}>❌</span>
      </button>
    </div >
  )
}

export default Order


