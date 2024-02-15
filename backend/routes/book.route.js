const express = require("express")
const router = express.Router()
const { books, bookByUser, createBook, updateBook, bookSearch} = require('../controllers/book.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post("/add", verifyToken, createBook)
router.post("/rate", verifyToken, updateBook)
router.get("/", books)
router.get("/bookByUser", verifyToken, bookByUser)
router.get("/search",bookSearch)



module.exports = router