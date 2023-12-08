import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from '../../Styles/styles.module.css'
import validation from './validation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addVideogame, setSelectedInForm } from '../../Redux/actions'
import FILTERTYPES from '../../helpers/filterTypes.helper'
import FormSelection from '../FormSelection/FormSelection'

const Form = () => {
  const dispatch = useDispatch()

  //leo los genres del estado global y los marco como no elegidos
  const allGenres = useSelector((state) => state.allGenres)
  const allPlatforms = useSelector((state) => state.allPlatforms)


  //Estados locales
  //datos cargados
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    source: 1
  })
  // estados de error
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    genres: "",
    platforms: "",
    errors: true
  })
  //genres y platforms seleccionadas 
  const selectedInForm = useSelector((state) => state.selectedInForm)
  const genres = selectedInForm.map((genre) => genre.type === FILTERTYPES.GENRE)
  const selectedGenres = genres.map((genre) => (genre.name))
  //boton para activar generos
  const [showGenres, setShowGenres] = useState(false)
  // visualizo u oculta genres
  const handleShowGenres = (event) => {
    event.preventDefault()
    setShowGenres(!showGenres)
  };
  const platforms = selectedInForm.map((platform) => platform.type === FILTERTYPES.PLATFORM)
  const selectedPlatforms = platforms.map((platform) => (platform.name))
  //boton para activar platforms
  const [showPlafforms, setShowPlatforms] = useState(false)
  // visualizo u oculta platform
  const handleShowPlatforms = (event) => {
    event.preventDefault()
    setShowPlatforms(!showPlafforms)
  };

  //cambios en el form
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, genres, platforms, errors, setErrors);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //destructiring
    const { name, description, image, released, rating } = userData
    console.log(userData)
    try {
      const { data, status } = await axios.post(`${SITEROUTES.URL}/videogames`, {
        name: name,
        description: description,
        image: image,
        released: released,
        rating: rating,
        genres: genres,
        platforms: platforms
      })
      //agrego el videogame al estdo global
      //await dispatch(addVideogame(userData))
      //y me fijo si hay que filtralo
      //await dispatch(regenerateFilters())

      window.alert('The Videogame was added successfully')
    } catch (error) {
      window.alert(error.message)

    }
  }

  //cambio en la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // limpiar el estado glogal de selecciones de genero y plataformas
  useEffect(() => {
    dispatch(setSelectedInForm())
  }, [dispatch])

  // para validaciones
  useEffect(() => {
    validation(userData, genres, platforms, errors, setErrors)

  }, [userData])




  return (
    <form onSubmit={handleSubmit}>
      <div >
        <div className={styles.options}>
          <button onClick={handleSubmit} disabled={errors.errors}>✅ Save</button>
          <Link to={SITEROUTES.HOME}>
            <button>❌ Cancel</button>
          </Link>
        </div>
        <div className={styles.formBody}>
          <div className={styles.containerForm}>
            <div className={styles.formItem}>
              <label htmlFor="name" >Name:</label>
              <input type="text" name="name" value={userData.name} placeholder={errors.name} onChange={handleChange} />
            </div>
            <div className={styles.formItem}>
              {/* description */}
              <label htmlFor="description" >Description:</label>
              <input type="text" name="description" value={userData.description} placeholder={errors.description} onChange={handleChange} />
            </div>
            <div className={styles.formItem}>

              {/* image */}
              <label htmlFor="image" >Image:</label>
              <input name="image" type="file" onChange={handleImageChange} />
              {userData.image && (
                <div>
                  <img src={userData.image} alt="Selected" style={{ width: '50px', height: '50px' }} />
                </div>
              )}
            </div>
            <div className={styles.formItem}>
              {/* released */}
              <label htmlFor="released">Released:</label>
              <input type="date" name="released" className={styles.inputReleased} value={userData.released} placeholder={errors.released} onChange={handleChange} />
              {/* <label> {errors.released ? "❌" : "✅"}</label>  */}
              <label htmlFor="released" className={styles.formError}>{errors.released}</label>
            </div>2

            <div className={styles.formItem}>
              {/* rating */}
              <label htmlFor="rating">Rating:</label>
              <input type="number" name="rating" className={styles.inputRating} value={userData.rating} placeholder={errors.rating} onChange={handleChange} />
              <label htmlFor="rating" className={styles.formError}>{errors.rating}</label>
            </div>
            {/* genres */}
            <div className={styles.formSelection}>
              <div className={styles.formItem}>
                {/* genres */}
                <label htmlFor="genres" >Genres:</label>
                {/* <input type="text" name="genres" value={selectedGenres} placeholder={errors.genres} disabled={true} /> */}
                <label htmlFor="genres" className={styles.formError}>{errors.genres}</label>
                <button onClick={handleShowGenres}>{showGenres ? "Hide Genres" : "Show Genres"}</button>
              </div>
              <div className={styles.formItem}>
                {/* Lista de géneros para seleccionar */}
                {showGenres &&
                  <div className={styles.container}>
                    {allGenres.map((genre) => (
                      <FormSelection
                        key={`${FILTERTYPES.GENRE}${genre.id}`}
                        id={genre.id}
                        name={genre.name}
                        type={FILTERTYPES.GENRE}
                        uniqueId={`${FILTERTYPES.GENRE}${genre.id}`}
                      />))
                    }
                  </div>
                }
              </div>
            </div>
          </div>
          {/* platforms */}
          <div className={styles.formSelection}>
            <div className={styles.formItem}>
              <label htmlFor="plaftorms" >Platforms:</label>
              <label htmlFor="platforms" className={styles.formError}>{errors.platforms}</label>
              <button onClick={handleShowPlatforms}>{showPlafforms ? "Hide Platforms" : "Show Platforms"}</button>
            </div>
            <div className={styles.formItem}>
              {/* Lista de platforms para seleccionar */}
              {showPlafforms &&
                <div className={styles.container}>
                  {allPlatforms.map((platform) => (
                    <FormSelection
                      key={`${FILTERTYPES.PLATFORM}${platform.id}`}
                      id={platform.id}
                      name={platform.name}
                      type={FILTERTYPES.PLATFORM}
                      uniqueId={`${FILTERTYPES.PLATFORM}${platform.id}`}
                    />))
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </form >
  )
}

export default Form