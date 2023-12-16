import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogamesFiltered, setAllFilters  } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'
import styles from '../../Styles/styles.module.css'
import FILTERTYPES from '../../helpers/filterTypes.helper'
import ORDERTYPES from '../../helpers/orderFilter.helper'

const Searchbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (name) {
            //agrego al objeto de filtros el name
            dispatch(setAllFilters({
                id: name,
                name: `Name contains ${name}`,
                type: FILTERTYPES.NAME,
                key: `${FILTERTYPES.NAME}${name}`,
                uniqueId:`${FILTERTYPES.NAME}${name}`,
                order:ORDERTYPES.NAME
            }))
            setName("")
        }
        navigate('/home')
    }

    return (
        <div>
            <div className={styles.header}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Search:</label>
                        {/* <div></div> */}
                        <input className={styles.input} name='search'
                            type='text'
                            onChange={handleChange}
                            value={name}>
                        </input>

                    </div>
                </form>
            </div>

        </div>


    )
}

export default Searchbar