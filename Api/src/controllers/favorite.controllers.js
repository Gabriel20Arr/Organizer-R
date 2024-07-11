import Favorite from "../Models/Favorito.model.js"

export const getFavs = async (req, res) => {
    const FoundFav = await Favorite.find({
        user: req.user.id
    }).populate("user")
    if(!FoundFav) return res.status(401).json({message: "Fav not found"})
    
    res.json(FoundFav)
}

export const postFav = async ( req, res ) => {
    const { name, email, puesto, contacto, descripcion, date } = req.body;

    const newFav = new Favorite({
        name, 
        email,
        puesto, 
        contacto, 
        descripcion,                            
        date,
        user: req.user.id
    })

    const FavSave =  await newFav.save()

    res.json(FavSave)
}

export const getFav = async (req, res) => {
    const _id = req.params.id

    const FoundFavId = await Favorite.findById(_id).populate("user")
    if(!FoundFavId) return res.status(400).json({message: "Favorite not found"})
    
    res.json(FoundFavId)
}

export const deleteFav = async (req, res) => {
    const _id = req.params.id;

    const FoundFavId = await Favorite.findByIdAndDelete(_id)
    if(!FoundFavId) return res.status(400).json({message: "Favorite not found"})

    res.json({message: "Favorite deleted"})
}