import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "./context/AuthContext"

function ProteccionRutas() {
    const { loading, autenticado } = useAuth();

    if(loading) return <h1>Loading...</h1>
    if(!loading && !autenticado) {
        return <Navigate to={"/login"} replace />
    } 
    
  return <Outlet />
}

export default ProteccionRutas;