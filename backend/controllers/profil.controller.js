const Profil = require("../models/userProfil.model")

//@desc create a new profil
//@route /profil
//@access Private 
const createProfil = async (req, res) => {
    const profilData = req.body
    const { id } = req.user
    try {

        const profil = await new Profil(profilData)
        profil.userId = id
        const data = await profil.save()
        res.status(200).json({
            message: "profil created",
            data,
        })
    } catch (error) {
        console.log(error.message)
    }
}

const updateProfil = async (req, res) => {
    const profilData = req.body
    const { id } = req.user
    try {
        const profil = await Profil.findOneAndUpdate({ userId: id },profilData,{new:true})
        
        res.status(200).json({
            message: "profil successfully updated",
            data:profil,
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getProfil = async (req, res) => {
    const { id } = req.user
    try {
        const data = await Profil.find({ userId: id })
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = { createProfil, getProfil, updateProfil }