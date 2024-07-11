import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import canditatosRoutes from "./routes/Candidatos.routes.js"
import favoritosRoutes from "./routes/Favorite.routes.js"

const app = express()

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:4000"],
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes);
app.use("/api", canditatosRoutes);
app.use("/api", favoritosRoutes);

export default app;