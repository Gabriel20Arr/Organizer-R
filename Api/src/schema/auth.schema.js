import {z} from "zod"

export const registerSchema = z.object({
    username: z.string({
        required_error: "Nombre es requerido"
    }).min(3, {
        message: "El nombre debe ser mayor a 3 caracteres"
    }),
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: "Password es requerido"
    }).min(6, {
        message: "la contraseña debe ser mayor a 6 caracteres"
    })
})


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: "Password es requerido"
    }).min(6, {
        message: "la contraseña debe ser mayor a 6 caracteres"
    })
})