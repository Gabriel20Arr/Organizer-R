import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from "../../context/AuthContext.jsx"
import { useEffect } from "react";

const Registrarse = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { registrarse, autenticado, error } = useAuth()

  const navegar = useNavigate()

  useEffect(() => {
    if(autenticado) navegar("/")
  }, [autenticado])
  
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
    <div className="bg-gray-100 flex flex-col justify-center items-center dark:bg-gray-800">
      <div className="max-w-[400px] w-full mx-auto p-8 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">Registre su cuenta aqui!</p>
        </div>
        <form className="space-y-4" 
          onSubmit={handleSubmit( 
            async (values) => { 
              await registrarse(values) 
            }
         )}
        >
          <div>
           {error && (<p className="text-red-50 bg-red-500 p-2">
            {error}
           </p>)}
            <label htmlFor="username" className="text-sm font-medium block mb-2">
              Nombre
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Pedro"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            />
            {errors.username && (<p className="text-red-500">El nombre es requerido</p>)}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register("email", {required: true})}
              placeholder="ejemplo@email.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            />
            {errors.email && (<span className="text-red-500">El correo es requerido</span>)}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", {required: true})}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            />
            {errors.password && (<span className="text-red-500">la contraseña es requerido</span>)}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="bg-gray-900 flex flex-col justify-center items-center p-8 dark:bg-gray-950">
      <div className="max-w-[400px] w-full space-y-4">
        <h2 className="text-3xl font-bold text-white">¿Ya tienes una cuenta?</h2>
        <p className="text-gray-400">
            Inicia sesión ahora y accede a todas las funcionalidades de nuestra plataforma.
        </p>
        <NavLink
          to="/login"
          className="inline-block px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Iniciar sesion
        </NavLink>
      </div>
    </div>
  </div>
  )
  
}

export default Registrarse