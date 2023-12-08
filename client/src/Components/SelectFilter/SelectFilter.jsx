import React, { useEffect, useState } from 'react'
import styles from '../../Styles/styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilters } from '../../Redux/actions'

import FILTERTYPES from '../../helpers/filterTypes.helper'

const SelectFilter = (props) => {
  const { id, name, type, uniqueId } = props
  const dispatch = useDispatch()
  //tomo los generos seleccionados
  const selectedFilters = useSelector((state) => state.selectedFilters)
  
  const [isSelected, setIsSelected] = useState(false) //filterSelected)
  

  useEffect(() => {
  // y veo si esta seleccionado o no para iniciale el estado local
  //lo hago al montar el componente
    const filterSelected = selectedFilters.some((filter) => filter.uniqueId === uniqueId);
    setIsSelected(filterSelected);
  }, [selectedFilters, uniqueId]);


  const handleOnClick = () => {
    setIsSelected(!isSelected)
    dispatch(setSelectedFilters({
      id: id,
      name: name,
      type: type,
      uniqueId: uniqueId
    }))
  }

  return (
    <div className={styles.container}>
      <button
        className={isSelected ? styles.selected : styles.unselected}
        onClick={handleOnClick}>
        {name}
      </button>
    </div>
  )
}

export default SelectFilter