import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from '../../Styles/styles.module.css'


import validation from './validation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addVideogame } from '../../Redux/actions'

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
    genres: [],
    platforms: [],
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
  //genres selected
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showGenres, setShowdGenres] = useState(false);

  //platforms selected
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showPlatforms, setShowdPlatforms] = useState(false);

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
    const { name, description, image, released, rating, genres, platforms } = userData
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
      window.alert('The Videogame was added successfully')
      
      //agrego el videogame al estdo global
      dispatch(addVideogame(userData))
      //y me fijo si hay que filtralo
      dispatch(regenerateFilters())

      
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
    <form onSubmit={handleSubmit}>
      <div >
        <div className={styles.options}>
          <button onClick={handleSubmit} disabled={errors.errors}>✅ Save</button>
          <Link to={SITEROUTES.HOME}>
            <button>❌ Cancel</button>
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
                  <input name="image" type="file"  onChange={handleImageChange} />
                  {userData.image && (
                    <div>
                      <img src={userData.image} className={styles.formImage} alt="Selected" />
                    </div>
                  )}
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