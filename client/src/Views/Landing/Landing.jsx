import React, { useEffect } from 'react'
import styles from '../../Styles/styles.module.css'
import { getAllGenres, getAllPlatforms, getAllVideogames, getSetup, setLanding, setLoading } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Components/Spinner/Spinner'

const Landing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading);


  const handleOnClick = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      // Configurar setup, leer genres, platforms y allvideogames
      await Promise.all([
        dispatch(getSetup()),
        dispatch(getAllGenres()),
        dispatch(getAllPlatforms()),
        dispatch(getAllVideogames()),
      ]);


    } catch (error) {
      window.alert(error);
    } finally {
      dispatch(setLoading(false));
      navigate('/home');
      dispatch(setLanding(false));
    }

  };

  return (
    <div >
      <button className={styles.loaderButton} onClick={handleOnClick}>Click Here to Enjoy VIDEOGAMES!!</button>
      <Spinner />

    </div>
  )
}

export default Landing