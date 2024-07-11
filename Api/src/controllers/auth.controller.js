import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { createAccesToken } from "../lib/jwt.js"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const register = async (req, res) => {
    const { username, password, email, createdAt,
        updatedAt } = req.body;

    try {
        const userFound = await User.findOne({email})
        if(userFound)
            return res.status(400).json(["El correo ya esta en uso"])

        const passHash = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            username,
            email,
            password: passHash,
            createdAt,
            updatedAt
        })

        const userSave = await newUser.save()
        const token = await createAccesToken({id: userSave.id})
        res.cookie("token", token)
        res.status(200).json({
            id: userSave.id,
            username: userSave.username,
            email: userSave.email,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        })
    } catch (error) {
        res.status(500).json({ error: error.errors.map((err) => err.message)  })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email })
        if(!userFound) return res.status(400).json("Usuario no encontrado")
        
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json("Contraseña incorrecta")

        const token = await createAccesToken({id: userFound.id})

        res.cookie("token", token)
        res.status(200).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({ error: error.errors.map((err) => err.message)  })
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })

    return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);

        const userFound = await User.findById(decoded.id);
        if (!userFound) {
            return res.status(404).json({ message: "No autorizado" });
        }

        return res.status(200).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "No autorizado" });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};     


export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json("Usuario no encontrado")
    
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}