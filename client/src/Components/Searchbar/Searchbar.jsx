import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'


const Searchbar = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const [name,setName]=useState("")

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getVideogamesByName(name))
        setName("")
        navigate('/home')
    }
    const handleNewVideogame = () => {
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='search'
                    type='text'
                    onChange={handleChange}
                    value={name}>
                </input>
                
            </form>
        </div>
    )
}

export default Searchbar