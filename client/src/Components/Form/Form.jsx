import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from './Form.module.css'
import validation from './validation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addVideogame, regenerateFilters } from '../../Redux/actions'

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
      //agrego el videogame al estdo global
      await dispatch(addVideogame(userData))
      //y me fijo si hay que filtralo
      await dispatch(regenerateFilters())

      window.alert('The Videogame was added successfully')
    } catch (error) {
      window.alert(error)

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

  //cambio en el genero
  const handleGenreSelection = (genre) => {

    // Verifica si el género ya está seleccionado
    const isSelected = userData.genres.find((g) => g.id === genre.id);

    // Actualiza la lista de géneros seleccionados
    if (isSelected) {
      setUserData({ ...userData, genres: userData.genres.filter((g) => g.id !== genre.id) })

    } else {
      setUserData({ ...userData, genres: [...userData.genres, { id: genre.id, name: genre.name }] })
    }
  };

  const handlePlatformSelection = (platform) => {

    // Verifica si el género ya está seleccionado
    const isSelected = userData.platforms.find((p) => p.id === platform.id);

    // Actualiza la lista de platforms seleccionados
    if (isSelected) {
      setUserData({ ...userData, platforms: userData.platforms.filter((p) => p.id !== platform.id) })

    } else {
      setUserData({ ...userData, platforms: [...userData.platforms, { id: platform.id, name: platform.name }] })
    }
  };

  useEffect(() => {

    validation(userData, errors, setErrors)
    setSelectedGenres(userData.genres.map((genre) => `${genre.name}`))
    setSelectedPlatforms(userData.platforms.map((platform) => `${platform.name}`))

  }, [userData])
  console.log('form')
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.Form}>
        {/* name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
          <label htmlFor="name">{errors.name}</label>
        </div>
        {/* description */}
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" value={userData.description} onChange={handleChange} />
          <label htmlFor="name">{errors.description}</label>
        </div>
        {/* image */}
        <div>
          <input type="file" onChange={handleImageChange} />
          {userData.image && (
            <div>
              <img src={userData.image} alt="Selected" style={{ width: '50px', height: '50px' }} />
            </div>
          )}
        </div>
        <div>
          {/* released */}
          <label htmlFor="released">Released:</label>
          <input type="date" name="released" value={userData.released} onChange={handleChange} />
          <label htmlFor="released">{errors.released}</label>
        </div>
        <div>
          {/* rating */}
          <label htmlFor="rating">Rating:</label>
          <input type="number" name="rating" value={userData.rating} onChange={handleChange} />
          <label htmlFor="rating">{errors.rating}</label>
        </div>
        <div>
          {/* genres */}

          <label htmlFor="genres">Genres:</label>
          <input type="text" name="genres" value={selectedGenres} disabled={true} />
          <label htmlFor="genres">{errors.genres}</label>
          {/* Lista de géneros para seleccionar */}
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {allGenres.map((genre) => (
              <div key={genre.id}>
                <input
                  type="checkbox"
                  id={`genre-${genre.id}`}
                  name={`genre-${genre.name}`}
                  onChange={() => handleGenreSelection(genre)}
                  checked={userData.genres.find((g) => g.id === genre.id)}

                />
                <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
              </div>
            ))
            }

          </div>
        </div>
        <div>
          {/* platforms */}
          <label htmlFor="platforms">Platforms:</label>
          <input type="text" name="platforms" value={selectedPlatforms} disabled={true} />
          <label htmlFor="platforms">{errors.platforms}</label>
          {/* Lista de plataformas para seleccionar */}
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {allPlatforms.map((platform) => (
              <div key={platform.id}>
                <input
                  type="checkbox"
                  id={`platform-${platform.id}`}
                  name={`platform-${platform.name}`}
                  onChange={() => handlePlatformSelection(platform)}
                  checked={userData.platforms.find((p) => p.id === platform.id)}

                />
                <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
              </div>
            ))
            }
          </div>
        </div>
        <button onClick={handleSubmit} disabled={errors.errors}>Save</button>

        <Link to={SITEROUTES.HOME}>
          <button>Cancel</button>
        </Link>
        <div>Form</div>
      </div>
    </form >
  )
}

export default Form