import React from 'react'
import { useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import styles from './Filters.module.css'
import { v4 as uuidv4 } from 'uuid';



const Filters = () => {
    const filterNames = useSelector((state) => state.filterNames)
    return (

        <div className={styles.Filters}>
            {filterNames.map((filter) => (
                <Filter key={uuidv4()}
                        name={filter.name}
                        type={filter.type}
                />))
            }
        </div>
    )
}

export default Filters