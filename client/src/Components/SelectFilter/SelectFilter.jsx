import React, { useEffect, useState } from 'react'
import styles from './SelectFilter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedGenres, setSelectedPlatforms, setSelectedSources, setSelectedYears } from '../../Redux/actions'
import FILTERTYPES from '../../helpers/filterTypes.helper'

const SelectFilter = (props) => {
  const { id, name, type } = props
  const dispatch = useDispatch()

  //tomo los generos seleccionados
  const selectedGenres = useSelector((state) => state.selectedGenres)
  const selectedPlatforms = useSelector((state) => state.selectedPlatforms)
  const selectedYears = useSelector((state) => state.selectedYears)
  const selectedSources = useSelector((state) => state.selectedSources)

  // y veo si esta seleccionado o no para iniciale el estado local
  let filterSelected = true
  switch (type) {
    case FILTERTYPES.GENRE:
      filterSelected = selectedGenres.some((genre) => genre.id === id)
    case FILTERTYPES.PLATFORM:
      filterSelected = selectedPlatforms.some((platform) => platform.id === id)
    case FILTERTYPES.YEAR:
      filterSelected = selectedYears.includes(id)
    case FILTERTYPES.SOURCE:
      filterSelected = selectedSources.includes(id)
    default:
      break;
  }

  const [isSelected, setIsSelected] = useState(filterSelected)

  const handleOnClick = () => {
    setIsSelected(!isSelected)
  }

  useEffect(() => {
    console.log(type)
    switch (type) {
      case FILTERTYPES.GENRE:
        dispatch(setSelectedGenres({ id: id, name: name }))
        break
      case FILTERTYPES.PLATFORM:
        dispatch(setSelectedPlatforms({ id: id, name: name }))
        break
      case FILTERTYPES.YEAR:
        dispatch(setSelectedYears(id))
        break
      case FILTERTYPES.SOURCE:
        dispatch(setSelectedSources(id))
        break

      default:
        break;
    }

  }

    , [isSelected]);

  return (
    <div className={styles.SelectFilter}>
      <button
        className={isSelected ? styles.selected : styles.unselected}
        onClick={handleOnClick}>
        {name}
      </button>
    </div>
  )
}

export default SelectFilter