import React from 'react'

const validation = (userData, errors, setErrors) => {

    const newErrors = errors
    newErrors.errors = false
    // validar name    
    if (!userData.page_size || userData.page_size <= 0) {
        newErrors.name = 'Enter the page size'
        newErrors.errors = true
    } else {
        newErrors.page_size = ''
    }
    setErrors(newErrors)
}

export default validation;