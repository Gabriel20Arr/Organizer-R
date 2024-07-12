import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from "./PageError.module.css"

const PageError = () => {
  const navigate = useNavigate()

  const HandlerBack = () => {
    navigate(-1)
  }
  
  return (
    <div className={styles.ContainerPage}>
        <div className={styles.ContainerPage2}>
            <span className={styles.PageE}>Error 404</span>
            <span className={styles.Page}>Page in maintenance</span>
            <button onClick={HandlerBack} className={styles.back}>Go back</button>
        </div>
    </div>
  )
}

export default PageError;