const express = require("express")
const router = express.Router()
const { login, register, users ,me, logout} = require('../controllers/user.controller')

router.post("/register", register)
router.post("/login", login)
router.get("/", users)
router.get("/logout", logout)
router.get("/me",me)



module.exports = router