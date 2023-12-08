import styles from "../../Styles/styles.module.css"

import SelectFilter from '../../Components/SelectFilter/SelectFilter'
import { useDispatch, useSelector } from "react-redux"
import { getSelectedFilters, getVideogamesFiltered, putSelectedFilters } from "../../Redux/actions"
import FILTERTYPES from "../../helpers/filterTypes.helper"
import { Link, useNavigate } from "react-router-dom"
import SITEROUTES from "../../helpers/siteroutes.helper"
import { useEffect, useState } from "react"
import { clearSelectedFilters } from "../../Redux/actions/clearSelectedFilters"

const SelectFilters = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const genres = useSelector((state) => state.allGenres)
  const platforms = useSelector((state) => state.allPlatforms)
  const years = useSelector((state) => state.allYears)
  const sources = useSelector((state) => state.allSources)

  const selectedFilters = useSelector((state) => state.selectedFilters)

  const handleOk = (event) => {
    event.preventDefault();
    //grabo los selected filters en allfilters
    dispatch(putSelectedFilters())
    //fitro los videogames
    dispatch(getVideogamesFiltered())
    //vuelvo a home
    navigate(SITEROUTES.HOME)
  }
  const handleCancel = (event) => {
    event.preventDefault();
    //limpio los selected filters 
    dispatch(clearSelectedFilters())
    //vuelvo a home
    navigate(SITEROUTES.HOME)
  }

  // useEffect(() => {
  //   const genresSelected=selectedFilters.filter((genre)=> genre.type===FILTERTYPES.GENRE)

  // }, [selectedFilters])
  useEffect(() => {
    //paso los filtered a selected
    dispatch(getSelectedFilters())

  }, [dispatch])


  return (
    <div>
      <div className={styles.options}>
        <button onClick={handleOk}>✅ Ok</button>
        <button onClick={handleCancel}> ❌ Cancel</button>
      </div>

      {/* //genres */}
      <div className={styles.body}>
        <div className={styles.title}>
          <label>Genres selected :</label>
        </div>
        <div className={styles.container}>
          {genres.map((genre) => (
            <SelectFilter
              key={`${FILTERTYPES.GENRE}${genre.id}`}
              id={genre.id}
              name={genre.name}
              type={FILTERTYPES.GENRE}
              uniqueId={`${FILTERTYPES.GENRE}${genre.id}`}
            />))
          }
        </div>
      </div >

      {/* platforms */}
      <div className={styles.body}>
        <div className={styles.title}>
          <label>Select Platforms</label>
        </div>
        <div className={styles.container}>
          {platforms.map((platform) => (
            <SelectFilter
              key={`${FILTERTYPES.PLATFORM}${platform.id}`}
              id={platform.id}
              name={platform.name}
              type={FILTERTYPES.PLATFORM}
              uniqueId={`${FILTERTYPES.PLATFORM}${platform.id}`}
            />))
          }
        </div>
      </div >

      {/* YEARS */}
      <div className={styles.body}>
        <div className={styles.title}>
          <label>Select the Year of Released</label>
        </div>
        <div className={styles.container}>
          {years.map((year) => (
            <SelectFilter key={`${FILTERTYPES.YEAR}${year.id}`}
              id={year.id}
              name={year.name}
              type={FILTERTYPES.YEAR}
              uniqueId={`${FILTERTYPES.YEAR}${year.id}`}

            />))
          }
        </div>
      </div>

      {/* SOURCES */}
      <div className={styles.body}>
        <div className={styles.title}>
          <label>Select the Source of Data </label>
        </div>
        <div className={styles.container}>
          {sources.map((source) => (
            <SelectFilter key={`${FILTERTYPES.SOURCE}${source.id}`}
              id={source.id}
              name={source.name}
              type={FILTERTYPES.SOURCE}
              uniqueId={`${FILTERTYPES.SOURCE}${source.id}`}

            />))
          }
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default SelectFilters 