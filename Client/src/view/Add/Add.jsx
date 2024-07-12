import React from 'react'
import styles from "./Add.module.css"
import { useForm } from "react-hook-form"
import { useCandidatos } from '../../context/CandidatosContext'

const Add = () => {
  const { register, handleSubmit, formState: errors } = useForm()
  const {createCandidatos, error } = useCandidatos()

  console.log(error.map(el => <span> {el} </span>));

  const onSubmit = handleSubmit( async(data) => {
    try {
      const res = await createCandidatos(data);
      if(res === null || undefined) {
        alert("Completar todos los campos")
      }
      // Recarga la página después de crear los datos
      // window.location.reload();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  }) 
    
  return (
    <div className={styles.containerAdd}>
    <form onSubmit={onSubmit} className={styles.formAdd}>
        <h1 className={styles.title}>Form Add</h1>
        {error.map((el, index) => (
          <div key={index} className={styles.ErroresForm}>
            <span>{el}</span>
          </div>
        ))}
        <div className={styles.ContainerReq}>
          <span className={styles.required}>*</span>
          <input 
            className={styles.input}
            type='text'
            placeholder='Nombre'
            {...register("name")}
            autoFocus
          />
        </div>
        {/* {errors.name && (<span className="text-red-500">El nombre es requerido</span>)} */}

        <div className={styles.ContainerReq}>
          <span className={styles.required}>*</span>
          <input 
            className={styles.input}
            type='text'
            placeholder='Email'
            {...register("email")}
          />
        </div>
        {/* {errors.email && (<span className="text-red-500">El correo es requerido</span>)} */}
        
        <div className={styles.ContainerReq}>
          <span className={styles.required}>*</span>
          <input 
            className={styles.input}
            type='text'
            placeholder='puesto'
            {...register("puesto")}
          />
        </div>
        {/* {errors.puesto && (<span className="text-red-500">El puesto es requerido</span>)} */}

        
        <div className={styles.ContainerReq}>
          <span className={styles.required}>*</span>
          <input 
            className={styles.input}
            type='text'
            placeholder='Contacto'
            {...register("contacto")}
          />
        </div>
        {/* {errors.contacto && (<span className="text-red-500">El nombre es requerido</span>)} */}


        <input 
          className={styles.inputD}
          type='text'
          placeholder='Descripcion'
          {...register("descripcion")}
        />
        <button className={styles.btn}>Agregar</button>
      </form>
    </div>
  )
}

export default Add