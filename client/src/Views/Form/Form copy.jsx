import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from './Form.module.css'
import validation from './validation'
import { useSelector } from 'react-redux'

const Form = () => {
  //leo los genres del estado global y los marco como no elegidos
  const genres = useSelector((state) => state.allGenres)

  //Estados locales
  //datos cargados
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: []
  })
  // estados de error
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    genres: "",
    platforms: ""
  })
  //imagen
  const [selectedImage, setSelectedImage] = useState(null);
  //genres selected
  const [selectedGenres, setSelectedGenres] = useState([]);

  //cambios en el form
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, errors, setErrors);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // login(userData);
  }

  //cambio en la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //cambio en el genero
  const handleGenreSelection = (genreId) => {
    // Verifica si el género ya está seleccionado
    const isSelected = selectedGenres.includes(genreId);

    // Actualiza la lista de géneros seleccionados
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
    
  };
  // const handleShowGenres = () => {
  //   // Aquí puedes mostrar los géneros de alguna manera (por ejemplo, una lista o un modal)
  //   console.log('Géneros disponibles:', genres);
  // };
  // const handleSaveGenreSelection = () => {
  //   // Puedes hacer algo con los géneros seleccionados, como enviarlos a un servidor o almacenarlos en el estado
  //   console.log('Géneros seleccionados:', selectedGenres);
  // };

  useEffect(() => {
    validation(userData, errors, setErrors)
  }, [userData, selectedGenres])

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
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" value={userData.description} onChange={handleChange} />
        <label htmlFor="name">{errors.description}</label>

        {/* image */}
        <input type="file" onChange={handleImageChange} />
        {selectedImage && (
          <div>
            <h2>Imagen seleccionada:</h2>
            <img src={selectedImage} alt="Selected" style={{ width: '50px', height: '50px' }} />
          </div>
        )}

        {/* released */}
        <label htmlFor="released">Released:</label>
        <input type="date" name="released" value={userData.released} onChange={handleChange} />
        <label htmlFor="name">{errors.released}</label>

        {/* rating */}
        <label htmlFor="rating">Rating:</label>
        <input type="number" name="rating" value={userData.rating} onChange={handleChange} />
        <label htmlFor="rating">{errors.rating}</label>

        {/* genres */}
        {/* <button onClick={handleShowGenres}>Select Genres</button> */}
        <label htmlFor="genres">Genres:</label>
        {/* Lista de géneros para seleccionar */}
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {genres.map((genre) => (
            <div key={genre.id}>
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                name={`genre-${genre.name}`}
                onChange={() => handleGenreSelection(genre.id)}
                checked={selectedGenres.includes(genre.id)}

              />
              <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
            </div>
          ))
          }

        </div>


        <Link to={SITEROUTES.HOME}>
          <button>Back</button>
        </Link>
        <div>Form</div>
      </div>
    </form >
  )
}

export default Form