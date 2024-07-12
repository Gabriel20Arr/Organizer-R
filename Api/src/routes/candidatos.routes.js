import { Router } from "express";
import { untenticacionRequerida } from "../middlewares/validateToken.js";
import { getCandidatos, getCandidato, postCandidatos, deleteCandidatos, putCandidatos } from "../controllers/Candidatos.controller.js";

import {validateSchema} from "../middlewares/validator.schema.js"
import { schemaCandidatosPost } from "../schema/candidatos.schema.js"

const router = Router()

router.get("/candidatos", untenticacionRequerida, getCandidatos)
router.post("/candidatos", untenticacionRequerida, validateSchema(schemaCandidatosPost), postCandidatos)
router.get("/candidatos/:id", untenticacionRequerida, getCandidato)
router.delete("/candidatos/:id", untenticacionRequerida, deleteCandidatos)
router.put("/candidatos/:id", untenticacionRequerida, putCandidatos)

export default router;