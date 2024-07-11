import { createContext, useContext, useState } from "react"
import {getFavsRequest, getFavRequest, createFavRequest, deleteFavRequest } from "../api/favorite.js"

const FavContext = createContext()

export const useFav = () => {
    const context = useContext(FavContext)

    if(!context) {
        throw new Error('useFav must be within a Taskprovider')
    }

    return context;
}

export function FavProvider ({children}) {
    const [ fav, setFav ] = useState([])

    const AllFav = async () => {
        try {
            const res = await getFavsRequest()
            setFav(res.data)
            // console.log(fav);
        } catch (error) {
            console.log(error);
        }
    }

    const FavById = async (id) => {
        const res = await getFavRequest(id)
        // console.log(res.data);
        return res.data
    } 
    

    const createFav =  async ( data ) => {
        const res = await createFavRequest(data);
        // console.log(res);    
    }

    const deletFav = async (id) => {
        try {
            const res = await deleteFavRequest(id)
            if(res.status === 200) setFav(fav.filter(fav => fav._id !== id))

        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <FavContext.Provider value={{
            fav, 
            AllFav, 
            createFav, 
            deletFav, 
            FavById
        }}>
            {children}
        </FavContext.Provider>
    )
}
