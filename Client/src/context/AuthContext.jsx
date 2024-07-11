import { createContext, useState, useContext, useEffect } from "react"
import { registerRequest, loginRequest, verifyToken } from "../api/auth.js"
import Cookies from "js-cookie"

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("El contexto debe usarse entre el authProvider")
    }

    return context
}


export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ autenticado, setAutenticado ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [error, setErrors ] = useState([])

    const registrarse = async (user) => {
        try {
            const res = await registerRequest(user) 
            setAutenticado(true)
            setUser(res.data)
        } catch (error) {
            setAutenticado(false)
            setErrors(error.response.data)
            // console.log(error.response.data)
        }
    } 

    const login = async (user) => {
        try {
            const res = await loginRequest(user)
            // console.log(res.data)
            setAutenticado(true)
            setUser(res.data);
        } catch (error) {
            console.log("errCont:", error);
            setAutenticado(false)
            setErrors(error.response.data)
        }
    }

    const logout = () => {
        Cookies.remove("token")
        setAutenticado(false)
        setUser(null)
    }
    

    useEffect(()=> {
        if(error.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000) 

            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
       async function checkLogin() {
            const token = Cookies.get("token");

            if(!token) {
                setAutenticado(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyToken(token)
                    setAutenticado(true)
                    setUser(res.data)
                    setLoading(false)
            } catch (error) {
                setAutenticado(false)
                setUser(null)
                setLoading(true)
            }
       }

       checkLogin()
    }, [])
    
    return(
        <AuthContext.Provider value={{
            registrarse, 
            user, 
            autenticado,
            error,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}