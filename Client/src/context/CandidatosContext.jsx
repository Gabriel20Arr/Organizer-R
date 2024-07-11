import { createContext, useContext, useState } from "react"
import { createCandidatosRequest, getCandidatoRequest, getCandidatosRequest, updateCandidatosRequest, deleteCandidatosRequest } from "../api/candidatos.js"

const ContextCandidatos = createContext()

export const useCandidatos = () => {
    const context = useContext(ContextCandidatos)

    if(!context) {
        throw new Error("El contexto debe usarse entre el CandidatosProvider")
    }

    return context
}

export function CandidatosProvider({children}) {
    const [ candidatos, setCandidatos ] = useState([])
    const [favoritos, setFavoritos] = useState([]);

    const getCandidatos = async () => {
        try {
            const res = await getCandidatosRequest()
            setCandidatos(res)
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const createCandidatos = async (data) => {
        const res = await createCandidatosRequest(data)
        // console.log(res);
    }

    
    const updateCandidatos = async (id, data) => {
        try {
            const res = await updateCandidatosRequest(id, data)
            // console.log("res:", res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCandidatos = async (id) => {
        try {
            const res = await deleteCandidatosRequest(id)
            // console.log("Candidato Eliminiado");
            await getCandidatos();
        } catch (error) {
            console.log(error);
        }
    }


    // Función para agregar un candidato a favoritos
    const agregarAFavoritos = (candidato) => {
        // Verificar si el candidato ya está en la lista de favoritos
        if (!favoritos.find(fav => fav.id === candidato.id)) {
            setFavoritos([...favoritos, candidato]);
        }
    };

    return <ContextCandidatos.Provider value={{
            candidatos,
            favoritos, 
            getCandidatos,
            createCandidatos,
            updateCandidatos,
            deleteCandidatos,
            agregarAFavoritos
        }}>
            {children}
        </ContextCandidatos.Provider>
    
}