import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/styles.module.css'
import ICONS from '../../helpers/icons.helper'

import validation from './validation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addVideogame } from '../../Redux/actions'

import { v4 as uuidv4 } from 'uuid'
import SITEROUTES from '../../helpers/siteroutes.helper'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //leo los genres del estado global y los marco como no elegidos
  const allGenres = useSelector((state) => state.allGenres)
  const allPlatforms = useSelector((state) => state.allPlatforms)


  //Estados locales
  const initialState = {
    name: "",
    description: "",
    image: "",
    imageBase64:"",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
    source: 1
  }
  //datos cargados
  const [userData, setUserData] = useState({ ...initialState, id: uuidv4() })

  // estados de error
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    imageBase64: "",
    released: "",
    rating: 0,
    genres: "",
    platforms: "",
    errors: true
  })
  //genres selected
  const [selectedGenres, setSelectedGenres] = useState([]);

  //platforms selected
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  //cambios en el form
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, errors, setErrors);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //destructiring
    try {
      //subo la image 
      
      const formData={
        name:userData.name,
        description:userData.description,
        platforms:userData.platforms,
        genres:userData.genres,
        rating:userData.rating,
        image:userData.image,
        imageBase64:userData.imageBase64,
        released:userData.released
      }
      const { data, status } = await axios.post(`${SITEROUTES.VIDEOGAMES}`, formData)

      if (status === 200) window.alert('The Videogame was added successfully')

      //agrego el videogame al estdo global
      const newVideogame={
        ...userData,
        id:data.id,
        image:data.image,
      }
      dispatch(addVideogame(newVideogame))
      //limpio para seguir cargando
      setUserData(initialState)


    } catch (error) {
      window.alert(error.response.data.error)
    }
  }


  //cambio en la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: file.name, imageBase64: reader.result })
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGenreSelection = (event, genre) => {
    event.preventDefault();
    // Verifica si el género ya está seleccionado
    const isSelected = userData.genres.find((g) => g.id === genre.id);

    // Actualiza la lista de géneros seleccionados
    if (isSelected) {
      setUserData({ ...userData, genres: userData.genres.filter((g) => g.id !== genre.id) })

    } else {
      setUserData({ ...userData, genres: [...userData.genres, { id: genre.id, name: genre.name }] })
    }
  };

  const handlePlatformSelection = (event, platform) => {
    event.preventDefault();
    // Verifica si el género ya está seleccionado
    const isSelected = userData.platforms.find((p) => p.id === platform.id);

    // Actualiza la lista de platforms seleccionados
    if (isSelected) {
      setUserData({ ...userData, platforms: userData.platforms.filter((p) => p.id !== platform.id) })

    } else {
      setUserData({ ...userData, platforms: [...userData.platforms, { id: platform.id, name: platform.name }] })
    }
  };

  // para validaciones
  useEffect(() => {
    validation(userData, errors, setErrors)
    setSelectedGenres(userData.genres.map((genre) => `${genre.name}`))
    setSelectedPlatforms(userData.platforms.map((platform) => `${platform.name}`))

  }, [userData])


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div >
        <div className={styles.options}>
          {errors.errors && <label className={styles.formError} >Please insert all the data required !! </label>}
          {!errors.errors && <button onClick={handleSubmit} className={errors.errors ? styles.unselected : styles.selected} disabled={errors.errors}>{ICONS.OK}Save</button>}
          <Link to={SITEROUTES.HOME}>
            <button>{ICONS.CANCEL} Close</button>
          </Link>
        </div>
        <div className={styles.formBody}>
          <table>
            <tbody>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="name" >Name:</label>
                </td>
                <td className={styles.formData}>
                  <input type="text" name="name" value={userData.name} placeholder={errors.name} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="description" >Description:</label>
                </td>
                <td className={styles.formData}>
                  <textarea name="description" className={styles.formTextarea} value={userData.description} placeholder={errors.description} onChange={handleChange} rows="4" cols="50" />
                </td>
              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="image" >Image:</label>
                </td>
                <td className={styles.formData}>
                  {userData.image && (
                    <div>
                      <img src={userData.imageBase64} className={styles.formImage} alt="Selected" />
                    </div>
                  )}
                  <input name="image" type="file" id="imageInput" accept="image/*" onChange={handleImageChange} />
                </td>

              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="released">Released:</label>
                </td>
                <td className={styles.formData}>
                  <input type="date" name="released" className={styles.inputReleased} value={userData.released} placeholder={errors.released} onChange={handleChange} />
                  <label htmlFor="released" className={styles.formError}>{errors.released}</label>
                </td>
              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="rating" >Rating:</label>
                </td>
                <td className={styles.formData}>
                  <input type="number" name="rating" className={styles.inputRating} value={userData.rating} placeholder={errors.rating} onChange={handleChange} />
                  <label htmlFor="rating" className={styles.formError}>{errors.rating}</label>
                </td>
              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="genres" >Genres:</label>
                </td>
                <td className={styles.formData}>
                  <input type="text" name="genres" value={selectedGenres} className={styles.textPlatform} placeholder={errors.genres} disabled={true} />
                </td>
              </tr>
              <tr>
                <td>

                </td>
                <td>
                  <div className={styles.formContainer}>
                    <div className={styles.formContainer}>
                      {/* Lista de géneros para seleccionar */}
                      {allGenres.map((genre) => (
                        <div className={styles.formContainer} key={genre.id}>
                          <button
                            className={userData.genres.find((g) => g.id === genre.id) ? styles.selected : styles.unselected}
                            onClick={(event) => handleGenreSelection(event, genre)}>
                            {genre.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="platforms" >Platforms:</label>
                </td>
                <td className={styles.formData}>
                  <input type="text" name="platforms" className={styles.textPlatform} value={selectedPlatforms} placeholder={errors.platforms} disabled={true} />
                </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                  <div className={styles.formContainer}>
                    {/* Lista de plataformas para seleccionar */}
                    {allPlatforms.map((platform) => (
                      <div key={platform.id}>
                        <button
                          className={userData.platforms.find((p) => p.id === platform.id) ? styles.selected : styles.unselected}
                          onClick={(event) => handlePlatformSelection(event, platform)}>
                          {platform.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form >
  )
}

export default Form