import { Router } from "express";
import { untenticacionRequerida } from "../middlewares/validateToken.js";
import { 
    getFav, 
    postFav,
    deleteFav,
    getFavs
} from "../Controllers/Favorite.controllers.js"
import {validateSchema} from "../middlewares/validator.schema.js"
import {schemaCandidatosPost} from "../schema/candidatos.schema.js"


const router = Router()


router.get("/favorite", untenticacionRequerida, getFavs) 

router.get("/favorite/:id", untenticacionRequerida, getFav)

router.post("/favorite", untenticacionRequerida, validateSchema(schemaCandidatosPost), postFav)

router.delete("/favorite/:id", untenticacionRequerida, deleteFav)

export default router;