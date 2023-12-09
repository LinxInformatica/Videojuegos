import styles from "../../Styles/styles.module.css"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import ICONS from "../../helpers/icons.helper"
import SITEROUTES from "../../helpers/siteroutes.helper"
import { useEffect, useState } from "react"
import SelectOrder from "../../Components/SelectOrder/SelectOrder"
import { getSelectedOrders, putSelectedOrders } from "../../Redux/actions"

const SelectOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orders = useSelector((state) => state.posibleOrders)

  const selectedOrders = useSelector((state) => state.selectedOrders)

  const handleOk = (event) => {
    event.preventDefault();
    //grabo los selected filters en allfilters
    dispatch(putSelectedOrders())
    navigate(SITEROUTES.HOME)
  }
  const handleCancel = (event) => {
    event.preventDefault();
    navigate(SITEROUTES.HOME)
  }

  useEffect(() => {
    //paso los AllOrders a selected
      dispatch(getSelectedOrders())

  }, [dispatch])

  return (
    <div>
      <div className={styles.options}>
        <button onClick={handleOk}>{ICONS.OK}Ok</button>
        <button onClick={handleCancel}> {ICONS.CANCEL}Cancel</button>
      </div>
      {/* //orders */}
      <div className={styles.body}>
        <div className={styles.title}>
          <label>Select the order:</label>
        </div>
        <div className={styles.container}>
          {orders.map((order) => (
            <SelectOrder
              key={order.id}
              id={order.id}
              name={order.name}
              order={order.order}
              field={order.field}
            />))
          }
        </div>
        {selectedOrders.length!==0 &&
          <div>
            <div className={styles.title}>
              <label>Orders selected :</label>
            </div>
            <div className={styles.container}>
              {selectedOrders.map((order) => (
                <button
                  className={styles.unselected}
                  key={`${order.field}${order.key}`}>
                  {order.name}
                </button>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SelectOrders 