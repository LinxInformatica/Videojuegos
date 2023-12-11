import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import styles from '../../Styles/styles.module.css'
import { clearAllFilters} from '../../Redux/actions'


const Filters = () => {
    const filters = useSelector((state) => state.allFilters)
    // const videogames = useSelector((state) => state.filteredVideogames)
    const dispatch=useDispatch()


    const clearFilters=()=>{
        dispatch(clearAllFilters())
    }


    const showFilters = filters.length === 0 ? (false) : (true)
    return (
        <div>
            {showFilters &&
                <div className={styles.header}>
                    <div className={styles.filter}>
                        <label>Filters:</label>
                        <button onClick={clearFilters}>Clear All</button>
                    {/* </div> */}
                    {/* <div className={styles.filter}> */}
                        {filters.map((filter) => (
                            <Filter key={`${filter.type}${filter.id}`}
                                name={filter.name}
                                type={filter.type}
                                uniqueId={`${filter.type}${filter.id}`}
                            />))
                        }
                    </div>


                </div>
            }
        </div>
    )
}

export default Filters