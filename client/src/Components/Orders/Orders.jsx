import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../Styles/styles.module.css'
import { clearAllFilters, getVideogamesFiltered } from '../../Redux/actions'
import SITEROUTES from '../../helpers/siteroutes.helper'
import Order from '../Order/Order'

const Orders = () => {
    const orders = useSelector((state) => state.allOrders)
    const dispatch=useDispatch()

    const showOrders = orders.length === 0 ? (false) : (true)
    return (
        <div>
            {showOrders &&
                <div className={styles.header}>
                    <div className={styles.filter}>
                        <label>Orders:</label>
                        {orders.map((order) => (
                            <Order key={order.id}
                                name={order.name}
                                type={order.type}
                                field={order.field}
                            />))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Orders