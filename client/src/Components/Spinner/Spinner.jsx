import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./Spinner.module.css"

const Spinner = () => {
    const loading = useSelector((state) => state.loading);
    return (
        <div>
            {loading ? 
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinnerRing}>
                        <div className={styles.spinnerSpan}>Loading..</div>

                    </div>
                </div>
                : <></>
            }
        </div>
    )
};

export default Spinner;
