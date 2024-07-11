import { z } from "zod";

export const schemaCandidatosPost = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }).min(1, {
        message: "El nombre es requerido"
    }),
    puesto: z.string({
        required_error: "El puesto es requerido"
    }).min(1, {
        message: "El puesto es requerido"
    }),
    contacto: z.string({
        required_error: "El contacto es requerido"
    }).min(1, {
        message: "El contacto es requerido"
    }),
    descripcion: z.string().optional(),
    date: z.string().datetime().optional()
})