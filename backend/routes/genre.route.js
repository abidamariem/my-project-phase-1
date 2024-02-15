const express = require("express")
const router = express.Router()
const { genres, createGenre, updateGenre} = require('../controllers/genre.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post("/add", verifyToken, createGenre)
router.post("/update", verifyToken, updateGenre)
router.get("/", genres)

module.exports = router