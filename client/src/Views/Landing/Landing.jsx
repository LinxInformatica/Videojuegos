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
      dispatch(setLoading(false));
      dispatch(setLanding(false));
      navigate('/home');

    } catch (error) {
      if(error.code==='ERR_NETWORK'){
        console.log(error)
        window.alert('Please check the internet conecction or the state of the HTTP server');
      }else{

        window.alert(error);
      }  
      dispatch(setLoading(false));
      dispatch(setLanding(true));
    }

  };

  return (
    <div >
      {!loading && <button className={styles.loaderButton} onClick={handleOnClick}>Click Here to Enjoy VIDEOGAMES!!</button>}
      <Spinner />

    </div>
  )
}

export default Landing