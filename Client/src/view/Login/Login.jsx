import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

const login = () => {
  const { register, handleSubmit, formState: errors } = useForm()
  const { login, error, autenticado } = useAuth()

  const navegar = useNavigate()

  useEffect(() => {
    if(autenticado) navegar("/")
  }, [autenticado])
  
  const onSubmit = handleSubmit( async(values) => {
    try {
      login(values)
    } catch (error) {
      console.log(error);
    }
  })
  

  // useEffect(() => {
  //   if(autenticado) navegar("/")
  // }, [autenticado])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
    <div className="bg-gray-100 flex flex-col justify-center items-center dark:bg-gray-800">
      <div className="max-w-[400px] w-full mx-auto p-8 space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bienvenido de vuelta</h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
        {error && (<p className="text-red-50 bg-red-500">
            {error}
           </p>)}
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@email.com"
              { ...register("email", { required: true })}
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
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            />
            {errors.password && (<span className="text-red-500">La contraseña es requerido</span>)}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="bg-gray-900 flex flex-col justify-center items-center p-8 dark:bg-gray-950">
      <div className="max-w-[400px] w-full space-y-4">
        <h2 className="text-3xl font-bold text-white">¿Aún no tienes una cuenta?</h2>
        <p className="text-gray-400">
          Regístrate ahora y disfruta de todas las funcionalidades de nuestra plataforma.
        </p>
        <Link
          to="/registrarse"
          className="inline-block px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Crear cuenta
        </Link>
      </div>
    </div>
  </div>
  )
}

export default login