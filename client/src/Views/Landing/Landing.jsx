import React, { useEffect } from 'react'
import styles from '../../Styles/styles.module.css'
import { getAllGenres, getAllPlatforms, getAllVideogames, setLoading } from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Landing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading);

  const loadData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all(
        [dispatch(getAllGenres()),
        dispatch(getAllPlatforms()),
        dispatch(getAllVideogames())])

    } catch (error) {
      window.alert(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleOnClick = (event) => {
    // Navegamos a la página de inicio
    event.preventDefault();
    loadData()
    navigate('/home');
  };

  return (
    <div>
      {loading ? (
        <div className={styles.loaderButton}>
          <button onClick={handleOnClick}>Enjoy VIDEOGAMES!!</button>
        </div>
      )
        : (<div className={styles.loader}>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
          <span style={{ "--i": 4 }}></span>
          <span style={{ "--i": 5 }}></span>
          <span style={{ "--i": 6 }}></span>
          <span style={{ "--i": 7 }}></span>
          <span style={{ "--i": 8 }}></span>
          <span style={{ "--i": 9 }}></span>
          <span style={{ "--i":10 }}></span>
          <span style={{ "--i":11 }}></span>
          <span style={{ "--i":12 }}></span>
          <span style={{ "--i":13 }}></span>
          <span style={{ "--i":14 }}></span>
          <span style={{ "--i":15 }}></span>
          <span style={{ "--i":16 }}></span>
          <span style={{ "--i":17 }}></span>
          <span style={{ "--i":18 }}></span>
          <span style={{ "--i":19 }}></span>
          <span style={{ "--i":20 }}></span>


        </div>

        )
      }
    </div>
  )
}

export default Landing