import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'
import styles from './Searchbar.module.css'
import Filters from '../Filters/Filters'
import Cards from '../Cards/Cards'

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
            dispatch(getVideogamesByName(name))
            setName("")
        }
        navigate('/home')
    }
    const handleNewVideogame = () => {

    }
    return (
        <div>
            <div className={styles.Searchbar}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Search:</label>
                    </div>
                    <div>
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