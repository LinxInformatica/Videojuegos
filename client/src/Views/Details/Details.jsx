import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from '../../Styles/styles.module.css'
import axios from 'axios'
import SOURCES from '../../helpers/sources.helper'
import formatDate from '../../utils/formatDate'
import ICONS from '../../helpers/icons.helper'
import { useDispatch } from 'react-redux'
import { delVideogame, setLoading } from '../../Redux/actions'
import Spinner from '../../Components/Spinner/Spinner'

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [videogame, setVideogame] = useState({})
  const [inDelete, setInDelete] = useState(false)

  const deleteVideogame = async (id) => {
    try {
      await axios.delete(`${SITEROUTES.VIDEOGAMES}/${id}`)
        .then(response => {
          window.alert('Videogame delete successfully!!!')
        })
      //lo borro del estado global  
      dispatch(delVideogame(id))
      navigate(SITEROUTES.HOME)

    } catch (error) {
      window.alert(error);
    }
  }
  const handleOnDelete = (event) => {
    event.preventDefault();
    deleteVideogame(id)
  }
  const handleSelectDelete = (event) => {
    event.preventDefault()
    setInDelete(!inDelete)
  }

  const handleOnEdit = (event) => {
    event.preventDefault();
    navigate(`/form/${id}`)
  }

  useEffect(() => {
    dispatch(setLoading(true))
    const fetchVideogame = async () => {
      try {
        const response = await axios(`${SITEROUTES.VIDEOGAMES}/${id}`)
        const { data } = response
        if (data[0].name) {
          setVideogame(data[0])
        } else {
          window.alert('No videogame');
          setVideogame({})
        }
      } catch (error) {
        window.alert(error);

      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchVideogame()

  }, [id]);

  const { name, description, image, released, genres, platforms, source, rating } = videogame
  const sourceName = SOURCES.find((s) => s.id === source)
  const releasedDate = formatDate(released)
  const imageUrl = source === 1 ? SITEROUTES.IMAGES + image : image
  return (
    <div>

      {name &&
        <div>
          <div className={styles.options}>
            {source === 1 && !inDelete
              ? (<>
                <button onClick={handleOnEdit}> {ICONS.CHANGE} Edit Videogame</button>
                <button onClick={handleSelectDelete}> {ICONS.DELETE} Delete Videogame</button>
              </>)
              : <></>
            }
            {source === 1 && inDelete
              ? (<>
                <label htmlFor="delete">Are you sure you want to delete the selected videogame?</label>
                <button onClick={handleOnDelete}> {ICONS.OK} Yes</button>
                <button onClick={handleSelectDelete}> {ICONS.CANCEL} No</button>
              </>)
              : <></>
            }
            <Link to={SITEROUTES.HOME} >
              <button> {ICONS.CANCEL} Close</button>
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
                    <input type="text" name="name" value={name} disabled={true} />
                  </td>
                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="description" >Description:</label>
                  </td>
                  <td className={styles.formData}>
                    <textarea name="description" className={styles.formTextarea} value={description} disabled={true} rows="4" cols="50" />
                  </td>
                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="image" >Image:</label>
                  </td>
                  <td className={styles.formData}>
                    {imageUrl && (
                      <div>
                        <img src={imageUrl} className={styles.formImage} alt="Selected" />
                      </div>
                    )}
                  </td>

                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="released">Released:</label>
                  </td>
                  <td className={styles.formData}>
                    <button
                      className={styles.selected}                          >
                      {releasedDate}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="rating" >Rating:</label>
                  </td>
                  <td className={styles.formData}>
                    <button
                      className={styles.selected}                          >
                      {rating}
                    </button>

                  </td>
                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="genres" >Genres:</label>
                  </td>
                  <td>
                    <div className={styles.formContainer}>
                      <div className={styles.formContainer}>
                        {/* Lista de géneros para seleccionar */}
                        {genres.map((genre) => (
                          <div className={styles.formContainer} key={genre.id}>
                            <button
                              className={styles.selected}>
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
                  <td>
                    <div className={styles.formContainer}>
                      {/* Lista de plataformas para seleccionar */}
                      {platforms.map((platform) => (
                        <div key={platform.id}>
                          <button
                            className={styles.selected}                          >
                            {platform.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={styles.formLabel}>
                    <label htmlFor="source" >Source:</label>
                  </td>
                  <td className={styles.formData}>
                    <button className={styles.selected}>{sourceName.name}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      <Spinner />
    </div>
  )
}

export default Details