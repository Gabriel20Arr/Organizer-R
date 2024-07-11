import Candidato from "../models/Candidatos.model.js"

export const getCandidatos = async (req, res) => {
    try {
        const Candidatos = await Candidato.find({
            user: req.user.id
        }).populate("user")
    
        res.status(200).json(Candidatos)
    } catch (error) {
        res.status(401).json({ message: "Candidatos no found"})
    }
}

export const getCandidato = async(req, res) => {
    const id = req.params.id;
    const Candidatos = await Candidato.findById(id)

    if(!Candidatos) return res.status(401).json({ message: "Candidatos no found"})
    res.status(200).json(Candidatos)
}   

export const postCandidatos = async (req, res) => {
    const { name, email, puesto, contacto, descripcion, date } = req.body;

    try {
        const newCandidatos = new Candidato({
            name, 
            email,
            puesto, 
            contacto, 
            descripcion,                            
            date,
            user: req.user.id
        })

        const CandidatoSaved = await newCandidatos.save()

        res.status(200).json(CandidatoSaved)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const deleteCandidatos = async (req, res) => {
    const id = req.params.id;
    const CandidatosDelete = await Candidato.findByIdAndDelete(id)

    if(!CandidatosDelete) return res.status(401).json({ message: "Candidato no encontrado"})
    res.sendStatus(204)
}

export const putCandidatos = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const CandidatosUpdate = await Candidato.findByIdAndUpdate(id, updateData, {
            new: true // Esta propiedad es para que devuelva el objeto nuevo
        });

        if (!CandidatosUpdate) {
            return res.status(404).json({ message: "Candidato no encontrado" });
        }

        res.status(200).json(CandidatosUpdate);
    } catch (error) {
        console.error("Error al actualizar el candidato:", error);
        res.status(500).json({ message: "Error al actualizar el candidato" });
    }
}
