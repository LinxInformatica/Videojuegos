import React, { useEffect, useState } from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedInForm } from '../../Redux/actions'

import FILTERTYPES from '../../helpers/filterTypes.helper'

const FormSelection = (props) => {
  const { id, name, type, uniqueId } = props
  const dispatch = useDispatch()

  //tomo los generos seleccionados
  const selectedInForm = useSelector((state) => state.selectedInForm)
  const filterSelected = selectedInForm.some((filter) => filter.uniqueId === uniqueId)

  const [isSelected, setIsSelected] = useState(filterSelected)

  const handleOnClick = (event) => {
    event.preventDefault();
    setIsSelected(!isSelected)
  }

  useEffect(() => {
    dispatch(setSelectedInForm({
      id: id,
      name: name,
      type: type,
      uniqueId: uniqueId
    }))
  }
    , [isSelected]);

  return (
    <div >
      <button
        className={isSelected ? styles.selected : styles.unselected}
        onClick={handleOnClick}>
        {name}
      </button>
    </div>
  )
}

export default FormSelection