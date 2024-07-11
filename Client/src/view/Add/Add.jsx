import React from 'react'
import styles from "./Add.module.css"
import { useForm } from "react-hook-form"
import { useCandidatos } from '../../context/CandidatosContext'

const Add = () => {
  const { register, handleSubmit } = useForm()
  const { candidatos, createCandidatos } = useCandidatos()


  const onSubmit = handleSubmit( async(data) => {
    try {
      await createCandidatos(data);
      // Recarga la página después de crear los datos
      window.location.reload();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  }) 
    
  return (
    <div className={styles.containerAdd}>
    <form onSubmit={onSubmit} className={styles.formAdd}>
        <h1 className={styles.title}>Form Add</h1>
        <input 
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          placeholder='Nombre'
          {...register("name")}
          autoFocus
        />
        <input 
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          placeholder='Email'
          {...register("email")}
        />
        <input 
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          placeholder='puesto'
          {...register("puesto")}
        />
        <input 
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          placeholder='Contacto'
          {...register("contacto")}
        />
        <input 
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          placeholder='Descripcion'
          {...register("descripcion")}
        />
        <button className={styles.btn}>Guardar</button>
      </form>
    </div>
  )
}

export default Add