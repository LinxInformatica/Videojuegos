import React from 'react'
import { useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import styles from './Filters.module.css'
import { v4 as uuidv4 } from 'uuid';



const Filters = () => {
    const filterNames = useSelector((state) => state.filterNames)
    const filterPlatforms = useSelector((state) => state.filterPlatforms)
    const filterYears = useSelector((state) => state.filterYears)
    const filterSources = useSelector((state) => state.filterSources)

    const showFilters = filterNames.length === 0 ? (false) : (true)
    return (
        <div>
            {showFilters &&
                <div className={styles.Filters}>
                    <div className={styles.title}>
                        <label>Filters:</label>
                    </div>
                    <div className={styles.container}>
                        {filterNames.map((filter) => (
                            <Filter key={uuidv4()}
                                name={filter.name}
                                type={filter.type}
                            />))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Filters