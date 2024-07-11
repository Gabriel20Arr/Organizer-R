import mongoose from "mongoose"

const schemaCandidatos = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Candidato", schemaCandidatos)