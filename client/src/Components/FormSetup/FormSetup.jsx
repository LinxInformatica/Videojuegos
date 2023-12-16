import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SITEROUTES from '../../helpers/siteroutes.helper'
import styles from '../../Styles/styles.module.css'
import axios from 'axios'
import ICONS from '../../helpers/icons.helper'
import { useDispatch, useSelector } from 'react-redux'
import validation from './validation'
import { getSetup, setPageSize } from '../../Redux/actions'
import Orders from '../Orders/Orders'

const FormSetup = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filters = useSelector((state) => state.allFilters)
  const orders = useSelector((state) => state.allOrders)

  //Estados locales
  const initialState = {
    page_size: useSelector((state) => state.page_size),
  }
  //datos cargados
  const [userData, setUserData] = useState({ ...initialState })
  const [errors, setErrors] = useState({
    page_size: "",
    errors: true
  })

  //cambios en el form
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, errors, setErrors);
  }

  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        page_size: userData.page_size,
        filters: filters,
        orders: orders,

      }
      const { data, status } = await axios.post(`${SITEROUTES.SETUP}`, formData)
      if (status === 200) window.alert('Setup saved successfully')
      dispatch(setPageSize(userData.page_size));
      navigate(SITEROUTES.HOME);
    } catch (error) {
      console.log(error)
      window.alert(error.response.data.error);

    }
  }

  return (
    <form>
      <div className={styles.options}>
        <button onClick={handleOnClick}> {ICONS.OK} Save Configuration</button>
        <Link to={SITEROUTES.HOME} >
          <button> {ICONS.CANCEL} Close</button>
        </Link>
      </div>

      <div className={styles.formBody}>
        <table>
          <tbody>
            <tr>
              <td className={styles.formLabel}>
                <label htmlFor="page_size" >Page Size:</label>
              </td>
              <td>
                <input type="number" name="page_size" className={styles.inputRating} value={userData.page_size} placeholder={errors.page_size} onChange={handleChange} />
                <label htmlFor="page_size" className={styles.formError}>{errors.page_size}</label>
              </td>
            </tr>
            {orders.length > 0 && <tr>
              <td className={styles.formLabel}>
                <label htmlFor="orders" >Orders:</label>
              </td>
              <td>
                <div className={styles.formContainer}>
                  <div className={styles.formContainer}>
                    {/* Lista de géneros para seleccionar */}
                    {orders.map((order) => (
                      <div className={styles.formContainer} key={order.id}>
                        <button
                          className={styles.selected}>
                          {order.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
            }
            {filters.length > 0 &&
              <tr>
                <td className={styles.formLabel}>
                  <label htmlFor="Filters" >Filters:</label>
                </td>
                <td>
                  <div className={styles.formContainer}>
                    <div className={styles.formContainer}>
                      {/* Lista de géneros para seleccionar */}
                      {filters.map((filter) => (
                        <div className={styles.formContainer} key={filter.id}>
                          <button
                            className={styles.selected}>
                            {filter.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </form>
  )
}

export default FormSetup