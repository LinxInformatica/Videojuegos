import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGenres, getAllPlatforms, getAllVideogames, setLoading } from '../../Redux/actions'

const Loader = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading);

    dispatch(setLoading(true));
    //Cargo datos iniciales de genders y platforms
    useEffect(() => {
        const loadData = async () => {
            try {
                dispatch(setLoading(true));
                await Promise.all(
                    [dispatch(getAllGenres()),
                    dispatch(getAllPlatforms()),
                    dispatch(getAllVideogames())])

            } catch (error) {
                console.error(error)
            } finally {
                dispatch(setLoading(false))
            }
        }

        loadData()
    }, [dispatch])

    return (
        <div>
            {loading && <div>Loading ...</div>}
        </div>
    )
}

export default Loader