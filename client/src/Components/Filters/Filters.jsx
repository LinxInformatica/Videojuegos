import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import styles from '../../Styles/styles.module.css'
import { clearAllFilters} from '../../Redux/actions'


const Filters = () => {
    const filters = useSelector((state) => state.allFilters)

    const dispatch=useDispatch()


    const clearFilters=()=>{
        dispatch(clearAllFilters())
    }


    const showFilters = filters.length === 0 ? (false) : (true)
    return (
        <div>
            {showFilters &&
                <div className={styles.cards}>
                    <div className={styles.filter}>
                        <label>Filters:</label>
                        <button onClick={clearFilters}>Clear All</button>
                         {filters.map((filter) => (
                            <Filter key={`${filter.type}${filter.id}`}
                                name={filter.name}
                                type={filter.type}
                                uniqueId={`${filter.type}${filter.id}`}
                                order={filter.order}
                            />))
                        }
                    </div>


                </div>
            }
        </div>
    )
}

export default Filters