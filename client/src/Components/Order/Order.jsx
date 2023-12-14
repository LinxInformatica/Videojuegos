import React from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch } from 'react-redux'
import { delOrder } from '../../Redux/actions'
import { changeOrder } from '../../Redux/actions/changeOrder'

const Order = (props) => {
  const { id, name, type, field } = props

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(delOrder(id))
  }
  const onClick = () => {
    dispatch(changeOrder(id))
  }
  
  return (
    <div className={styles.filter}>
      <button className={styles.filterButton} >
        <span onClick={onClick}>{name}</span>
        <span onClick={onDelete}>❌</span>
      </button>
    </div >
  )
}

export default Order


