import React, {useEffect, useState} from 'react'
import styles from "./Edit.module.css"
import { useForm } from "react-hook-form"
 
import { useCandidatos } from '../../context/CandidatosContext'

const Edit = ({selectedRows}) => {
  const { register, handleSubmit, setValue } = useForm()
  const { updateCandidatos } = useCandidatos()
  const [id, setId] = useState();


  useEffect(() => {
    if (selectedRows.length > 0) {
        const candidato = selectedRows[0];
        setId(candidato._id);
        setValue("name", candidato.name);
        setValue("email", candidato.email);
        setValue("puesto", candidato.puesto);
        setValue("contacto", candidato.contacto);
        setValue("descripcion", candidato?.descripcion);
    }
}, [selectedRows, setValue]);
    
    // {console.log("id:", selectedRows[0]?._id)}
const onSubmit = handleSubmit(async (data) => {
    try {
        await updateCandidatos(id, data);
        window.location.reload();
    } catch (error) {
        console.error('Error update data:', error);
    }
});
    
  return (
    <div className={styles.containerAdd}>
    <form onSubmit={onSubmit} className={styles.formAdd}>
        <h1 className={styles.title}>Form Add</h1>
        <input 
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          type='text'
          name='name'
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

export default Edit