import React, {useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext'

import imgEditUser from "../../assets/avatar-de-usuario.png"
import imgUser from "../../assets/usuario.png"

import styles from "./Profile.module.css"
import { Link } from 'react-router-dom'

const Profile = () => {
  const { profile } = useAuth()
  const [dataP, setDataP] = useState([])
  const [loading, setLoading] = useState(<h2>loading..</h2>)


  useEffect(() => {
      async function getProfile() {
        const ress = await profile();
        { ( ress === undefined ) && loading }
        setDataP(ress)
        // console.log("data2", dataP);
      }

      getProfile()
  }, [profile])

  return (
    <div className={styles.container0}>
        <h1 className={styles.t}>Profile</h1>
        
        <div className={styles.container}>
          <div className={styles.containerImg}>
            <img src={imgUser} alt='img' className={styles.image}/>
          </div>  

          <div className={styles.container2}>
            <div className={styles.edit}>
            <Link to={"/error-page"}>
              <img src={imgEditUser} alt='' className={styles.imgEdit} />
            </Link>
            </div>
            
            <div className={styles.CInput}>
              <span className={styles.nameInput}>Name</span> 
              <span className={styles.items}>{dataP.username}</span>
            </div>

            <div className={styles.CInput}>
              <span className={styles.nameInput}>Email</span> 
              <span className={styles.items}>{dataP.email}</span>
            </div>
            
            <div className={styles.CInput}>
              <span className={styles.nameInput}>Creation</span> 
              <span className={styles.items}>{new Date(dataP.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

        </div>
          
    </div>
  )
}

export default Profile;