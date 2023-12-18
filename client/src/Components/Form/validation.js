import React from 'react'

const validation = (userData, errors, setErrors,allVideogames) => {

    const newErrors = errors
    newErrors.errors = false
    // validar name    
    if (!userData.name) {
        newErrors.name = 'Enter the name of the Videogame'
        newErrors.errors = true
    } else {
        const nameExists=allVideogames.find((videogame)=>videogame.name.toUpperCase()===userData.name.toUpperCase() && videogame.id!==userData.id)
        if(nameExists){
            newErrors.name = 'The name exists!!'
            newErrors.errors = true
        } else{
            newErrors.name=''
        }
    }

    if (!userData.description) {
        newErrors.description = 'Enter the description of the Videogame'
        newErrors.errors = true
    } else {
        newErrors.description = ''
    }

    if (!userData.image) {
        newErrors.image = 'Select the Image of the Videogame'
        newErrors.errors = true
    } else {
        newErrors.image = ''
    }

    if (!userData.released) {
        newErrors.released = 'Enter the date of released of the Videogame'
        newErrors.errors = true
    } else {
        newErrors.released = ''
    }

    if (userData.rating < 0 || userData.rating > 10) {
        newErrors.rating = 'The rating should be between 0 and 10'
        newErrors.errors = true
    } else {
        newErrors.rating = ''

    }
    if (!userData.genres || userData.genres.length === 0) {
        newErrors.genres = 'Choose at least one Gender'
        newErrors.errors = true
    } else {
        newErrors.genres = ''
    }

    if (!userData.platforms || userData.platforms.length === 0) {
        newErrors.platforms = 'Choose at least one Platform'
        newErrors.errors = true
    } else {
        newErrors.platforms = ''
    }
    setErrors(newErrors)
}

export default validation;