import styles from "./SelectFilters.module.css"

import SelectFilter from '../../Components/SelectFilter/SelectFilter'
import { useDispatch, useSelector } from "react-redux"
import { getSelectedGenres, getSelectedPlatforms, getSelectedSources, getSelectedYears, putSelectedGenres, putSelectedPlatforms, putSelectedSources, putSelectedYears } from "../../Redux/actions"
import FILTERTYPES from "../../helpers/filterTypes.helper"
import { Link, useNavigate } from "react-router-dom"
import SITEROUTES from "../../helpers/siteroutes.helper"

const SelectFilters = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()

  //paso los filtered a selected
  dispatch(getSelectedGenres())
  dispatch(getSelectedPlatforms())
  dispatch(getSelectedYears())
  dispatch(getSelectedSources())

  const genres = useSelector((state) => state.allGenres)
  const platforms = useSelector((state) => state.allPlatforms)
  const years = useSelector((state) => state.allYears)
  const sources = useSelector((state) => state.allSources)

  const handleOnClick=()=>{
    dispatch(putSelectedGenres())
    dispatch(putSelectedPlatforms())
    dispatch(putSelectedYears())
    dispatch(putSelectedSources())
    navigate(SITEROUTES.HOME)
  }

  return (
    <div>
      <div className={styles.SelectOptions}>
        <button onClick={handleOnClick}>Ok</button>
        
        <Link to={SITEROUTES.HOME}>
          <button>Cancel</button>
        </Link>
        </div>

      {/* //genres */}
      <div className={styles.SelectFilters}>
        <div className={styles.title}>
          <label>Select Genres</label>
        </div>
        <div className={styles.container}>
          {genres.map((genre) => (
            <SelectFilter key={`genre_${genre.id}`}
              id={genre.id}
              name={genre.name}
              type={FILTERTYPES.GENRE}
            />))
          }
        </div>
      </div >

      {/* platforms */}
      <div className={styles.SelectFilters}>
        <div className={styles.title}>
          <label>Select Platforms</label>
        </div>
        <div className={styles.container}>
          {platforms.map((platform) => (
            <SelectFilter key={`plaftorm_${platform.id}`}
              id={platform.id}
              name={platform.name}
              type={FILTERTYPES.PLATFORM}
            />))
          }
        </div>
      </div >

      {/* YEARS */}
      <div className={styles.SelectFilters}>
        <div className={styles.title}>
          <label>Select the Year of Released</label>
        </div>
        <div className={styles.container}>
          {years.map((year) => (
            <SelectFilter key={`year_${year}`}
              id={year}
              name={year}
              type={FILTERTYPES.YEAR}
            />))
          }
        </div>
      </div>

      {/* SOURCES */}
      <div className={styles.SelectFilters}>
        <div className={styles.title}>
          <label>Select the Source </label>
        </div>
        <div className={styles.container}>
          {sources.map((source) => (
            <SelectFilter key={`source_${source}`}
              id={source}
              name={source}
              type={FILTERTYPES.SOURCE}
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