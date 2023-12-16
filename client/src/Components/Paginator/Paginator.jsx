import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../Styles/styles.module.css'
import { setCurrentPage, setTotalOfPages } from '../../Redux/actions'
import PAGINATOR from "../../helpers/paginator.helper"
import ICONS from '../../helpers/icons.helper'

const Paginator = () => {
    const totalItems = useSelector((state) => state.filteredVideogames.length)
    const currentPage = useSelector((state) => state.currentPage)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(1))
        dispatch(setTotalOfPages(totalItems));
    }, [totalItems])

    const totalOfPages = useSelector((state) => state.totalOfPages)
    const pagesToShow = []
    for (let i = 1; i <= totalOfPages; i++) {
        pagesToShow.push({id:i,enable:true})
    }

    const handleChangePage = (event) => {
        dispatch(setCurrentPage(event.target.id))
    }
    return (
        <div className={styles.cards}>
            {totalItems>0 && (
                <div>
                    <button onClick={handleChangePage}
                        key={PAGINATOR.FIRST}
                        id={PAGINATOR.FIRST}>
                        {ICONS.FIRST}
                    </button>
                    <button onClick={handleChangePage}
                        key={PAGINATOR.PREV}
                        id={PAGINATOR.PREV}>
                        {ICONS.PREV}
                    </button>
                    {pagesToShow.map((page) => (
                        <button onClick={handleChangePage}
                            key={page.id}
                            id={page.id}
                            className={page.id === currentPage ? styles.selected : null}>
                            {page.id}
                        </button>

                    ))}
                    <button onClick={handleChangePage}
                        key={PAGINATOR.NEXT}
                        id={PAGINATOR.NEXT}>
                        {ICONS.NEXT}
                    </button>
                    <button onClick={handleChangePage}
                        key={PAGINATOR.LAST}
                        id={PAGINATOR.LAST}>
                        {ICONS.LAST}
                    </button>

                </div>
            )}
        </div >
    )
}

export default Paginator