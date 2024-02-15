const express = require('express')
const { createProfil, getProfil , updateProfil} = require('../controllers/profil.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()


//@desc create a new profil
//@route /profil
//@access Private 
router.post("/create", verifyToken, createProfil)
router.get("/", verifyToken, getProfil)
router.put("/update" ,verifyToken,updateProfil )





module.exports = router